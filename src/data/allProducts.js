import { products as menProducts } from "../pages/Men";
import { products as womenProducts } from "./womenProducts";
import { newArrivalProducts } from "../pages/NewArrivals";
import { premiumProducts } from "../pages/PremiumEdition";

function prepareProducts(list, category) {
    return list.map((product, index) => ({
        ...product,
        routeId: `${category}-${product.id ?? index + 1}`,
        productId: `${category}-${product.id ?? index + 1}`,
        name: product.name ?? product.title ?? "Everlast Fragrance",
        image: product.image ??
            product.imageUrl ??
            product.img ??
            "/images/products/office-for-men.png",
        price: Number(
            String(product.price ?? 0).replace(/[^\d.]/g, "")
        ),
        category,
    }));
}

const homeProducts = [{
        id: "hawas-ice",
        name: "Hawas Ice",
        image: "/images/products/hawas-ice.png",
        price: 2500,
        category: "home",
    },
    {
        id: "creed-aventus",
        name: "Creed Aventus",
        image: "/images/products/creed-aventus.png",
        price: 2800,
        category: "home",
    },
];

export const allProducts = [
    ...prepareProducts(menProducts, "men"),
    ...prepareProducts(womenProducts, "women"),
    ...prepareProducts(newArrivalProducts, "new"),
    ...prepareProducts(premiumProducts, "premium"),
    ...homeProducts.map((product) => ({
        ...product,
        routeId: product.id,
        productId: product.id,
    })),
];

export function getProductByRouteId(routeId) {
    return allProducts.find((product) => product.routeId === routeId);
}