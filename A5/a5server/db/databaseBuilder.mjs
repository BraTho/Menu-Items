/**
 * Helper to build the MenuItems collection.
 *
 * @module DatabaseBuilder
 */
import * as Constants from "../utils/constants.mjs";
import { ConnectionManager } from "./ConnectionManager.mjs";

export { rebuild };

/**
 * Rebuilds the MenuItems collection in the "restaurantdb" database.
 *
 * @throws {Error} if a database error occurs
 */
async function rebuild() {
    let client = null;
    try {
        client = await ConnectionManager.getConnection();
        let collection = client
            .db(Constants.DB_NAME)
            .collection(Constants.DB_COLLECTION);
        await collection.drop();
        await collection.insertMany([
            {
                id: 101,
                category: "APP",
                description: "beet and orange salad",
                price: 16,
                vegetarian: true,
            },
            {
                id: 102,
                category: "APP",
                description: "oysters rockefeller",
                price: 20,
                vegetarian: false,
            },
            {
                id: 103,
                category: "APP",
                description: "pan seared foie gras",
                price: 28,
                vegetarian: false,
            },
            {
                id: 104,
                category: "APP",
                description: "porchini and asparagus risotto",
                price: 15,
                vegetarian: true,
            },
            {
                id: 105,
                category: "APP",
                description: "beef carpaccio",
                price: 18,
                vegetarian: false,
            },
            {
                id: 106,
                category: "APP",
                description: "diver digby scallops three ways",
                price: 22,
                vegetarian: false,
            },
            {
                id: 107,
                category: "APP",
                description: "ahi tuna",
                price: 24,
                vegetarian: false,
            },
            {
                id: 108,
                category: "APP",
                description: "calamari",
                price: 15,
                vegetarian: false,
            },
            {
                id: 109,
                category: "APP",
                description: "crab cake",
                price: 13,
                vegetarian: false,
            },
            {
                id: 110,
                category: "APP",
                description: "caprese salad with pine nuts",
                price: 16,
                vegetarian: true,
            },
            {
                id: 111,
                category: "APP",
                description: "braised rabbit canneloni",
                price: 16,
                vegetarian: false,
            },
            {
                id: 112,
                category: "APP",
                description: "half moon river clams",
                price: 20,
                vegetarian: false,
            },
            {
                id: 113,
                category: "APP",
                description: "black-eyed pea patty with tomato relish",
                price: 15,
                vegetarian: false,
            },
            {
                id: 114,
                category: "APP",
                description: "french onion soup",
                price: 15,
                vegetarian: true,
            },
            {
                id: 201,
                category: "ENT",
                description: "black cod",
                price: 28,
                vegetarian: false,
            },
            {
                id: 202,
                category: "ENT",
                description: "seared digby scallops on leek fettuccine",
                price: 30,
                vegetarian: false,
            },
            {
                id: 203,
                category: "ENT",
                description: "duck two ways",
                price: 28,
                vegetarian: false,
            },
            {
                id: 204,
                category: "ENT",
                description: "herb crusted rack of lamb",
                price: 32,
                vegetarian: false,
            },
            {
                id: 205,
                category: "ENT",
                description:
                    "boneless quails stuffed with foie gras and truffles",
                price: 32,
                vegetarian: false,
            },
            {
                id: 206,
                category: "ENT",
                description: "fresh pasta with arugula and cherry tomatoes",
                price: 22,
                vegetarian: true,
            },
            {
                id: 207,
                category: "ENT",
                description: "lamb shank nehari",
                price: 28,
                vegetarian: false,
            },
            {
                id: 208,
                category: "ENT",
                description: "beef tenderloin",
                price: 38,
                vegetarian: false,
            },
            {
                id: 209,
                category: "ENT",
                description: "chicken valdostana",
                price: 25,
                vegetarian: false,
            },
            {
                id: 210,
                category: "ENT",
                description: "char grilled AAA tenderloin with grilled shrimp",
                price: 42,
                vegetarian: false,
            },
            {
                id: 211,
                category: "ENT",
                description: "ratatouille with garlic beans and saffron rice",
                price: 27,
                vegetarian: true,
            },
            {
                id: 212,
                category: "ENT",
                description: "boeuf bourguignon",
                price: 34,
                vegetarian: false,
            },
            {
                id: 213,
                category: "ENT",
                description: "sweet potato ravioli with apricot moustarda",
                price: 30,
                vegetarian: true,
            },
            {
                id: 214,
                category: "ENT",
                description: "baked sage grits and vegetable hash",
                price: 28,
                vegetarian: true,
            },
            {
                id: 215,
                category: "ENT",
                description: "parmesan dusted flounder with spiced quail",
                price: 30,
                vegetarian: false,
            },
            {
                id: 301,
                category: "DES",
                description: "lemon tart",
                price: 12,
                vegetarian: true,
            },
            {
                id: 302,
                category: "DES",
                description: "une meule",
                price: 14,
                vegetarian: true,
            },
            {
                id: 303,
                category: "DES",
                description: "baked alaska",
                price: 16,
                vegetarian: true,
            },
            {
                id: 304,
                category: "DES",
                description: "mignardises",
                price: 9,
                vegetarian: true,
            },
            {
                id: 305,
                category: "DES",
                description: "house made gelato",
                price: 9,
                vegetarian: true,
            },
            {
                id: 306,
                category: "DES",
                description: "creme brulee",
                price: 13,
                vegetarian: true,
            },
            {
                id: 307,
                category: "DES",
                description: "seasonal berries with cream",
                price: 11,
                vegetarian: true,
            },
            {
                id: 308,
                category: "DES",
                description: "rhubarb trifle with mascarpone",
                price: 12,
                vegetarian: true,
            },
            {
                id: 309,
                category: "DES",
                description: "doughnut and jam sampler",
                price: 13,
                vegetarian: true,
            },
            {
                id: 310,
                category: "DES",
                description: "chocolate mousse",
                price: 12,
                vegetarian: true,
            },
        ]);
    } catch (err) {
        throw new Error(err);
    } finally {
        client.close();
    }
}
