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
const categoryLinks = document.querySelector("#categoryLinks");

const typeNames = {
  hero: "Hero Image",
  feature: "Feature Image",
  specs: "Specs Image",
  compare: "Comparison Image",
  lifestyle: "Lifestyle Image",
  closing: "A+ Closing Image",
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
  return typeNames[type] || type || "Uncategorized";
}

function getCategoryUrl(type) {
  if (!type) return "./#gallery";
  return `./?category=${encodeURIComponent(type)}#gallery`;
}

function getCategoryFromUrl() {
  return new URLSearchParams(window.location.search).get("category") || "all";
}

function setupCategoryLinks(types) {
  const allLink = document.createElement("a");
  allLink.className = "category-link";
  allLink.href = getCategoryUrl("");
  allLink.textContent = `All Images (${items.length})`;
  categoryLinks.append(allLink);

  for (const type of types) {
    const link = document.createElement("a");
    link.className = "category-link";
    link.href = getCategoryUrl(type);
    link.textContent = `${getTypeLabel(type)} (${items.filter((item) => item.type === type).length})`;
    categoryLinks.append(link);
  }

  const selectedType = getCategoryFromUrl();
  for (const link of categoryLinks.querySelectorAll("a")) {
    const linkType = new URL(link.href).searchParams.get("category") || "all";
    link.classList.toggle("is-active", linkType === selectedType);
  }
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
  setupCategoryLinks(types);
  const category = getCategoryFromUrl();
  if (category === "all" || types.includes(category)) {
    typeFilter.value = category;
  }
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
  imageButton.setAttribute("aria-label", `Preview ${item.title}`);

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
  description.textContent = item.description || "No description available.";

  const filename = document.createElement("span");
  filename.className = "filename";
  filename.textContent = getFileName(item.image);

  body.append(tag, title, description, filename);
  article.append(imageButton, body);

  imageButton.addEventListener("click", () => openLightbox(item));

  return article;
}

function createGroupHeading(type, isFirst) {
  const heading = document.createElement("h3");
  heading.className = "gallery-group-title";
  if (!isFirst) heading.classList.add("is-separated");
  heading.textContent = getTypeLabel(type);
  return heading;
}

function renderGallery() {
  const visibleItems = items.filter(matchesFilters);
  const groups = [];
  const groupedItems = new Map();

  for (const item of visibleItems) {
    if (!groupedItems.has(item.type)) {
      groupedItems.set(item.type, []);
      groups.push(item.type);
    }
    groupedItems.get(item.type).push(item);
  }

  const rendered = [];
  groups.forEach((type, groupIndex) => {
    rendered.push(createGroupHeading(type, groupIndex === 0));
    rendered.push(
      ...groupedItems
        .get(type)
        .map((item, index) => createCard(item, groupIndex * 5 + index)),
    );
  });
  grid.replaceChildren(...rendered);
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
typeFilter.addEventListener("change", () => {
  const type = typeFilter.value;
  window.history.replaceState({}, "", getCategoryUrl(type === "all" ? "" : type));
  for (const link of categoryLinks.querySelectorAll("a")) {
    const linkType = new URL(link.href).searchParams.get("category") || "all";
    link.classList.toggle("is-active", linkType === type);
  }
  renderGallery();
});
closeLightbox.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

setupFilters();
renderGallery();
