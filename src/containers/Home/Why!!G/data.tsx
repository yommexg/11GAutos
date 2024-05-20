const transImage = new URL(
  "../../../assets/why11G/transparent.svg",
  import.meta.url
).href;

const minImage = new URL("../../../assets/why11G/MinNotHr.svg", import.meta.url)
  .href;

const shopImage = new URL("../../../assets/why11G/Shop.svg", import.meta.url)
  .href;

export const Why11GData = [
  {
    imgSrc: transImage,
    title: "Transparent pricing",
    desc: "No surprises here. See how much you'll pay on cars you like.",
  },
  {
    imgSrc: minImage,
    title: "Minutes, not hours",
    desc: "Time saving tools to help you find the right car in a snap.",
  },
  {
    imgSrc: shopImage,
    title: "Shop your way",
    desc: "Your own pace, your own space. Shop online where and when it's convenient for you.",
  },
];
