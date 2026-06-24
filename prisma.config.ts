import "dotenv/config";
import { defineConfig, env } from "prisma/config";
import { config } from "dotenv";

// Next.js 项目环境变量在 .env.local，Prisma CLI 默认不读，需显式加载
config({ path: ".env.local", override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts", // Prisma 7：seed 配置写在这里，不再只靠 package.json
  },
  datasource: {
    // CLI 命令（migrate / db pull / migrate status）走 DIRECT_URL（Supavisor Session，5432）
    // Prisma 7 已移除 schema 里的 directUrl，迁移连接串统一配在这个 url 字段
    url: env("DIRECT_URL"),
  },
});