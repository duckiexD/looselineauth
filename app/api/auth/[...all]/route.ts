// app/api/auth/[...all]/route.ts
import { toNodeHandler } from "better-auth/node";
import { auth } from "@/auth";

const handler = toNodeHandler(auth);

export { handler as GET, handler as POST };