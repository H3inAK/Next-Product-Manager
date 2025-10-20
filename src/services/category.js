export const categoryApiUrl = `${process.env.NEXT_PUBLIC_API}/categories`;

const categoryFetcher = (...args) => fetch(...args).then((res) => res.json());

export default categoryFetcher;
