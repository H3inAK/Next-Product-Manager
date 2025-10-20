export const productApiUrl = `${process.env.NEXT_PUBLIC_API}/products`;

const productFetcher = (...args) => fetch(...args).then((res) => res.json());

export const deleteProduct = async (id) => {
  return fetch(`${productApiUrl}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};

export const storeProduct = async (payload) => {
  return fetch(productApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

export const updateProduct = async (id, payload) => {
  return fetch(`${productApiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

export default productFetcher;
