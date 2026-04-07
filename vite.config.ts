import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    // 로컬 개발 서버 고정 포트
    // strictPort: true → 6173이 이미 사용 중이면 자동으로 다른 포트로 가지 않고 에러
    port: 6173,
    strictPort: true,
  },
});
