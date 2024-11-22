import express from "express";
import cors from "cors";
import { join } from "path";

import {
    getAllItems,
    deleteItem,
    addItem,
    updateItem,
} from "./db/menuItemAccessor.mjs";
import { MenuItem } from "./entity/MenuItem.mjs";
import * as Constants from "./utils/constants.mjs";

const app = express();

app.use(express.static(Constants.PUBLIC_FOLDER));

app.use(express.json());

app.use(cors());

app.get("/api/menuitems", async function (request, response) {
    try {
        let data = await getAllItems();
        response.status(200).json({ err: null, data: data });
    } catch (err) {
        response
            .status(500)
            .json({ err: "could not read data" + err, data: null });
    }
});

app.delete("/api/menuitems/:id(\\d{3})", async function (request, response) {
    let id = Number(request.params.id);

    if (id < 100 || id > 999) {
        return response.status(400).json({ err: "ID must be between 100 - 999", data: null });
    }

    try {
        let dummyItem = new MenuItem(id, "ENT", "some desc", 99, false);

        try {
            let ok = await deleteItem(dummyItem);
            if (ok) {
                response.status(200).json({ err: null, data: true });
            } else {
                response.status(404).json({
                    err: `Item with ID ${dummyItem.id} does not exist`,
                    data: null,
                });
            }
        } catch (err) {
            response.status(500).json({ err: "Delete aborted: " + err.message, data: null });
        }
    } catch (err) {
        response.status(400).json({ err: err.message, data: null });
    }
});

app.post("/api/menuitems/:id(\\d{3})", async function (request, response) {
    try {
        let rawitem = request.body;
        let menuitem = new MenuItem(
            rawitem.id,
            rawitem.category,
            rawitem.description,
            rawitem.price,
            rawitem.vegetarian
        );

        try {
            let ok = await addItem(menuitem);
            if (ok) {
                response.status(201).json({ err: null, data: true });
            } else {
                response.status(409).json({
                    err: `item ${menuitem.id} already exists`,
                    data: null,
                });
            }
        } catch (err) {
            console.log(">>>", err);
            response
                .status(500)
                .json({ err: "insert aborted" + err, data: null });
        }
    } catch (err) {
        response.status(400).json({ err: err.message, data: null });
    }
});

app.put("/api/menuitems/:id(\\d{3})", async function (request, response) {
    try {
        let rawitem = request.body;
        let menuitem = new MenuItem(
            rawitem.id,
            rawitem.category,
            rawitem.description,
            rawitem.price,
            rawitem.vegetarian
        );

        try {
            let ok = await updateItem(menuitem);
            if (ok) {
                response.status(200).json({ err: null, data: true });
            } else {
                response.status(404).json({
                    err: `item ${menuitem.id} does not exist`,
                    data: null,
                });
            }
        } catch (err) {
            response
                .status(500)
                .json({ err: "update aborted" + err, data: null });
        }
    } catch (err) {
        response.status(400).json({ err: err.message, data: null });
    }
});

app.get("/api/menuitems/:id(\\d{3})", function (request, response) {
    response.status(405).json({ err: "Single GETs not supported", data: null });
});

app.delete("/api/menuitems", function (request, response) {
    response
        .status(405)
        .json({ err: "Bulk deletes not supported", data: null });
});

app.post("/api/menuitems", function (request, response) {
    response
        .status(405)
        .json({ err: "Bulk inserts not supported", data: null });
});

app.put("/api/menuitems", function (request, response) {
    response
        .status(405)
        .json({ err: "Bulk updates not supported", data: null });
});

app.use(function (request, response, next) {
    response
        .status(404)
        .sendFile(join(process.cwd(), Constants.PUBLIC_FOLDER, "404.html"));
});

app.listen(Constants.PORT_NUM, function () {
    console.log(`Example app listening on port ${Constants.PORT_NUM}!`);
});
