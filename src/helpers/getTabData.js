export default function getTabData(product, tab) {
  return product.descriptions.find((description) => description.type === tab);
}
