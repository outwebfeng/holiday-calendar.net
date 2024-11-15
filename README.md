# Holiday Calendar 节日日历

一个基于Next.js构建的美国节日信息和倒计时网站。

## 项目概述

Holiday Calendar是一个双语(英文/中文)节日信息平台,为用户提供美国节日的详细信息、倒计时、文化洞察和庆祝指南。

### 主要功能

- 节日倒计时显示
- 节日详情介绍(历史、文化背景等)
- 庆祝活动指南
- 禁忌提醒
- 双语支持(英文/中文)
- 深色/浅色主题切换

## 技术栈

- **框架**: Next.js 13.5
- **样式**: Tailwind CSS
- **UI组件**: shadcn/ui
- **动画**: Framer Motion
- **国际化**: next-intl
- **图标**: Lucide React
- **类型检查**: TypeScript

## 系统架构

### 目录结构
holiday-calendar/
├── app/ # Next.js 应用目录
│ ├── [locale]/ # 国际化路由
│ └── globals.css # 全局样式
├── components/ # React组件
├── config/ # 配置文件
├── data/ # 静态数据
├── lib/ # 工具函数
├── messages/ # 国际化文案
└── public/ # 静态资源


### 核心模块

1. **国际化路由**
> app/[locale]/layout.tsx
> startLine: 1
> endLine: 50


2. **节日数据管理**
> json:data/holidays.json


3. **主题系统**
- 支持深色/浅色主题切换
- 基于Tailwind CSS的主题定制

## 部署要求

### 系统要求

- Node.js 18.0+
- npm 或 yarn

### 安装步骤

1. 克隆仓库
> git clone https://github.com/outwebfeng/holiday-calendar.net
> cd holiday-calendar.net


2. 安装依赖
> npm install
或
> yarn install


3. 启动开发服务器
> npm run dev
或
> yarn dev


4. 构建生产版本
> npm run build
或
> yarn build


## 环境配置

项目使用以下环境变量:
> NEXT_PUBLIC_API_URL=your_api_url
> NEXT_PUBLIC_SITE_URL=your_site_url

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

- Email: support@holidaycalendar.net
- GitHub: [项目仓库](https://github.com/outwebfeng/holiday-calendar.net)