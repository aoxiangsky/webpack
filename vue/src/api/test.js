import request from "@/utils/https.js";

export function test() {
  return request({
    url: "https://www.mxnzp.com/api",
    method: "get",
  });
}
