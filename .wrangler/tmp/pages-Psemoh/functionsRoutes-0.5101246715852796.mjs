import { onRequestGet as __api_admin_products_js_onRequestGet } from "G:\\REbyte\\WEBSITE\\rabyte-tech\\functions\\api\\admin\\products.js"
import { onRequestPost as __api_admin_products_js_onRequestPost } from "G:\\REbyte\\WEBSITE\\rabyte-tech\\functions\\api\\admin\\products.js"
import { onRequestPost as __api_auth_change_password_js_onRequestPost } from "G:\\REbyte\\WEBSITE\\rabyte-tech\\functions\\api\\auth\\change-password.js"
import { onRequestPost as __api_auth_forgot_password_js_onRequestPost } from "G:\\REbyte\\WEBSITE\\rabyte-tech\\functions\\api\\auth\\forgot-password.js"
import { onRequestPost as __api_auth_login_js_onRequestPost } from "G:\\REbyte\\WEBSITE\\rabyte-tech\\functions\\api\\auth\\login.js"
import { onRequestGet as __api_auth_me_js_onRequestGet } from "G:\\REbyte\\WEBSITE\\rabyte-tech\\functions\\api\\auth\\me.js"
import { onRequestPost as __api_auth_register_js_onRequestPost } from "G:\\REbyte\\WEBSITE\\rabyte-tech\\functions\\api\\auth\\register.js"
import { onRequestGet as __api_products__slug__js_onRequestGet } from "G:\\REbyte\\WEBSITE\\rabyte-tech\\functions\\api\\products\\[slug].js"
import { onRequestGet as __api_products_index_js_onRequestGet } from "G:\\REbyte\\WEBSITE\\rabyte-tech\\functions\\api\\products\\index.js"
import { onRequestGet as __products__slug__js_onRequestGet } from "G:\\REbyte\\WEBSITE\\rabyte-tech\\functions\\products\\[slug].js"

export const routes = [
    {
      routePath: "/api/admin/products",
      mountPath: "/api/admin",
      method: "GET",
      middlewares: [],
      modules: [__api_admin_products_js_onRequestGet],
    },
  {
      routePath: "/api/admin/products",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_products_js_onRequestPost],
    },
  {
      routePath: "/api/auth/change-password",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_change_password_js_onRequestPost],
    },
  {
      routePath: "/api/auth/forgot-password",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_forgot_password_js_onRequestPost],
    },
  {
      routePath: "/api/auth/login",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_login_js_onRequestPost],
    },
  {
      routePath: "/api/auth/me",
      mountPath: "/api/auth",
      method: "GET",
      middlewares: [],
      modules: [__api_auth_me_js_onRequestGet],
    },
  {
      routePath: "/api/auth/register",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_register_js_onRequestPost],
    },
  {
      routePath: "/api/products/:slug",
      mountPath: "/api/products",
      method: "GET",
      middlewares: [],
      modules: [__api_products__slug__js_onRequestGet],
    },
  {
      routePath: "/api/products",
      mountPath: "/api/products",
      method: "GET",
      middlewares: [],
      modules: [__api_products_index_js_onRequestGet],
    },
  {
      routePath: "/products/:slug",
      mountPath: "/products",
      method: "GET",
      middlewares: [],
      modules: [__products__slug__js_onRequestGet],
    },
  ]