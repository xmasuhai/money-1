export default function importAllSvg() {
  // 批量导入 svg
  const importAll = (requireContext: __WebpackModuleApi.RequireContext) => {
    requireContext.keys().forEach(requireContext);
  };

// 指定目录 只能用相对路径 不支持 @ 别名路径
// 使用 importAll 方法加载所有的 *.svg 文件
  importAll(require.context('../assets/icons/', true, /\.svg$/));

// 捕获报错
  try {
    importAll(require.context('../assets/icons/', true, /\.svg$/));
  } catch (error) {
    console.log(error);
  }
}
