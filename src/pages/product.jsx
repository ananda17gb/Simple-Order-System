export const products = [
  { id: 1, name: "Rice 5kg", price: 80000 },
  { id: 2, name: "Cooking Oil 1L", price: 25000 },
  { id: 3, name: "Chicken Breast 500g", price: 35000 },
  { id: 4, name: "Eggs (12 pcs)", price: 30000 },
  { id: 5, name: "Tomatoes (1kg)", price: 15000 },
  { id: 6, name: "Onions (1kg)", price: 12000 },
  { id: 7, name: "Potatoes (1kg)", price: 10000 },
  { id: 8, name: "Carrots (1kg)", price: 12000 },
  { id: 9, name: "Milk (1L)", price: 22000 },
  { id: 10, name: "Sugar 1kg", price: 18000 },
];

export const getProductPrice = (id) => {
  const product = products.find((p) => p.id === id);
  return product ? product.price : 0;
};

export const getProductList = () => products;
