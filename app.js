const items = Array.isArray(window.GALLERY_ITEMS) ? window.GALLERY_ITEMS : [];

const grid = document.querySelector("#galleryGrid");
const searchInput = document.querySelector("#searchInput");
const typeFilter = document.querySelector("#typeFilter");
const emptyState = document.querySelector("#emptyState");
const imageCount = document.querySelector("#imageCount");
const typeCount = document.querySelector("#typeCount");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxTitle = document.querySelector("#lightboxTitle");
const lightboxDescription = document.querySelector("#lightboxDescription");
const downloadLink = document.querySelector("#downloadLink");
const closeLightbox = document.querySelector("#closeLightbox");

const typeNames = {
  hero: "主图",
  feature: "卖点图",
  specs: "规格图",
  compare: "对比图",
  lifestyle: "场景图",
  closing: "A+收束图",
};

function normalize(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function getFileName(path) {
  return path.split("/").pop() || path;
}

function getTypeLabel(type) {
  return typeNames[type] || type || "未分类";
}

function setupFilters() {
  const types = [
    ...new Set(items.map((item) => item.type).filter(Boolean)),
  ].sort();

  for (const type of types) {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = getTypeLabel(type);
    typeFilter.append(option);
  }

  imageCount.textContent = String(items.length);
  typeCount.textContent = String(types.length);
}

function matchesFilters(item) {
  const keyword = normalize(searchInput.value);
  const selectedType = typeFilter.value;
  const haystack = normalize(
    [
      item.title,
      item.type,
      getTypeLabel(item.type),
      item.description,
      getFileName(item.image),
    ].join(" "),
  );

  return (
    (!keyword || haystack.includes(keyword)) &&
    (selectedType === "all" || item.type === selectedType)
  );
}

function createCard(item, index) {
  const article = document.createElement("article");
  article.className = "card";
  article.style.animationDelay = `${Math.min(index * 55, 440)}ms`;

  const imageButton = document.createElement("button");
  imageButton.className = "image-button";
  imageButton.type = "button";
  imageButton.setAttribute("aria-label", `预览 ${item.title}`);

  const image = document.createElement("img");
  image.src = item.image;
  image.alt = item.title;
  image.loading = "lazy";
  image.decoding = "async";
  imageButton.append(image);

  const body = document.createElement("div");
  body.className = "card-body";

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = getTypeLabel(item.type);

  const title = document.createElement("h3");
  title.textContent = item.title;

  const description = document.createElement("p");
  description.textContent = item.description || "暂无说明。";

  const filename = document.createElement("span");
  filename.className = "filename";
  filename.textContent = getFileName(item.image);

  body.append(tag, title, description, filename);
  article.append(imageButton, body);

  imageButton.addEventListener("click", () => openLightbox(item));

  return article;
}

function renderGallery() {
  const visibleItems = items.filter(matchesFilters);
  grid.replaceChildren(...visibleItems.map(createCard));
  emptyState.hidden = visibleItems.length > 0;
}

function openLightbox(item) {
  lightboxImage.src = item.image;
  lightboxImage.alt = item.title;
  lightboxTitle.textContent = item.title;
  lightboxDescription.textContent = item.description || "";
  downloadLink.href = item.image;
  downloadLink.download = getFileName(item.image);

  if (typeof lightbox.showModal === "function") {
    lightbox.showModal();
    return;
  }

  window.open(item.image, "_blank", "noopener");
}

searchInput.addEventListener("input", renderGallery);
typeFilter.addEventListener("change", renderGallery);
closeLightbox.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

setupFilters();
renderGallery();
