import { usePBClient } from "./base/client";

// 基础模块导出
export * from "./base/client";
export * from "./base/setup";

export default usePBClient();

// 封装异步操作到一个函数中，避免顶层 await
const initializeAndTest = async () => {
  try {
    const pb = usePBClient();
    const admin = {
      email: "admin@gmail.com",
      password: "admin123456",
    };

    // 执行健康检查
    const healthCheck = await pb.health.check();
    const isHealthy = healthCheck.code === 200;
    console.log("服务健康检查结果:", healthCheck);
    console.log("服务是否健康:", isHealthy);

    // 打印初始认证状态
    console.log("初始认证状态:", pb.authStore.isValid);

    // 管理员登录
    await pb.admins.authWithPassword(admin.email, admin.password);
    console.log("登录后认证状态:", pb.authStore.isValid);
  } catch (error) {
    // 捕获并打印错误信息
    console.error("执行过程中出现错误:", error);
  }
};

// 调用初始化和测试函数
initializeAndTest();
