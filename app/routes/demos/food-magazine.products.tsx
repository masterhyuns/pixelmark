import type { Route } from "./+types/food-magazine.products"
import { products } from "~/demos/food-magazine/data/content"

import honeyUrl from "~/demos/food-magazine/assets/images/products/product-honey.webp"
import breadUrl from "~/demos/food-magazine/assets/images/products/product-bread.webp"
import granolaUrl from "~/demos/food-magazine/assets/images/products/product-granola.webp"
import jamUrl from "~/demos/food-magazine/assets/images/products/product-jam.webp"

export const meta: Route.MetaFunction = () => [
  { title: "Products · 제품 — Verde Provisions Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 식품 매거진 데모. 가상 브랜드 'Verde Provisions'의 제품 페이지 — 4개의 가상 제품 카탈로그.",
  },
]

const PRODUCT_IMAGES: Record<"honey" | "bread" | "granola" | "jam", string> = {
  honey: honeyUrl,
  bread: breadUrl,
  granola: granolaUrl,
  jam: jamUrl,
}

export default function FoodMagazineProducts() {
  return (
    <section className="fmag-products">
      <div className="fmag-container">
        <div className="fmag-section-head" data-fmag-reveal>
          <h2 className="fmag-section-title">{`The\nCatalog`}</h2>
          <div className="fmag-section-meta">
            <p>04 PRODUCTS · 2026</p>
            <p>네 가지 식료품</p>
          </div>
        </div>

        <div className="fmag-products-intro" data-fmag-reveal>
          <span className="fmag-eyebrow">Verde Provisions · Catalog 2026</span>
          <p>
            라벨이 짧을수록 좋은 재료라는 믿음으로, 베르데는 다섯 가지 이하의 원료만으로 식료품을 만듭니다.
            아래는 이번 시즌의 네 가지 — 강원도의 한 작은 농장에서 시작된 식탁의 풍경입니다.
          </p>
        </div>

        <div className="fmag-products-grid">
          {products.map((p, i) => (
            <article key={p.num} className="fmag-product" data-fmag-reveal style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
              <div className="fmag-product-image">
                <img src={PRODUCT_IMAGES[p.image]} alt={`${p.title} (가상)`} loading="lazy" />
              </div>
              <div>
                <div className="fmag-product-rule">
                  <span>№ {p.num}</span>
                  <span>{p.categoryKr}</span>
                </div>
                <h3 className="fmag-product-title">{p.title}</h3>
                <p className="fmag-product-title-kr">{p.titleKr}</p>
                <p className="fmag-product-caption">{p.caption}</p>
                <p className="fmag-product-price">{p.price}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
