// 处理AI响应
function handleAIResponse(userMessage) {
    let response = '';
    if (userMessage.includes('联系方式') || userMessage.includes('怎么联系')) {
        response = '您可以通过以下方式联系我们：<br>' +
               '1. 电话：18210824219<br>' +
               '2. 邮箱：mavis00713@qq.com<br>' +
               '3. 地址：北京市朝阳区高碑店鲜花工厂';
    }
    // ...其他代码
} 