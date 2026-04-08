import type { Route } from "./+types/winebar-darklux.menu"
import { menu } from "~/demos/winebar-darklux/data/content"

export const meta: Route.MetaFunction = () => [
  { title: "Menu · 메뉴 — Verres Noirs Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 다크 럭셔리 와인바 데모. 'Verres Noirs'의 와인 / 칵테일 / 안주 메뉴 페이지.",
  },
]

export default function WinebarMenu() {
  return (
    <section className="wbd-section">
      <div className="wbd-container">
        <div className="wbd-menu-head" data-wbd-reveal>
          <span className="wbd-eyebrow">— The List · 와인 리스트 —</span>
          <h2 className="wbd-menu-title">Tonight's Pour</h2>
        </div>

        <div className="wbd-menu-tabs" role="tablist" aria-label="메뉴 카테고리">
          {menu.categories.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className={`wbd-menu-tab${i === 0 ? " is-active" : ""}`}
              data-target={c.id}
              role="tab"
            >
              {c.label} · {c.labelKr}
            </button>
          ))}
        </div>

        {menu.categories.map((c, i) => (
          <div
            key={c.id}
            className={`wbd-menu-panel${i === 0 ? " is-active" : ""}`}
            data-panel={c.id}
            role="tabpanel"
          >
            <ul className="wbd-menu-list">
              {menu.items[c.id].map((item) => (
                <li key={item.name} className="wbd-menu-item">
                  <div>
                    <p className="wbd-menu-item-name">{item.name}</p>
                    <p className="wbd-menu-item-name-kr">{item.nameKr}</p>
                  </div>
                  <span className="wbd-menu-item-price">{item.price}</span>
                  <p className="wbd-menu-item-caption">{item.caption}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p className="wbd-menu-recommend" data-wbd-reveal>"{menu.recommendation}"</p>
      </div>
    </section>
  )
}
