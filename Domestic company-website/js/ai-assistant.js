document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input button');
    const quickQuestions = document.querySelectorAll('.quick-questions button');
    
    // 处理快速问题点击
    quickQuestions.forEach(button => {
        button.addEventListener('click', function() {
            addUserMessage(this.textContent);
            handleAIResponse(this.textContent);
        });
    });
    
    // 处理发送按钮点击
    sendButton.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message) {
            addUserMessage(message);
            handleAIResponse(message);
            chatInput.value = '';
        }
    });
    
    // 处理输入框回车事件
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const message = this.value.trim();
            if (message) {
                addUserMessage(message);
                handleAIResponse(message);
                this.value = '';
            }
        }
    });
    
    // 添加用户消息
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <i class="fas fa-user"></i>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // 处理AI响应
    function handleAIResponse(userMessage) {
        let response = '';
        if (userMessage.includes('如何预约')) {
            response = '您可以通过以下方式预约服务：<br>1. 拨打客服电话<br>2. 在线填写预约表单<br>3. 使用微信小程序预约';
        } else if (userMessage.includes('服务价格')) {
            response = '我们的服务价格根据服务类型和时长有所不同，基础保洁服务起价50元/小时，具体价格请查看服务详情页面。';
        } else if (userMessage.includes('服务内容')) {
            response = '我们提供以下服务：<br>1. 日常保洁<br>2. 深度清洁<br>3. 家电清洗<br>4. 开荒保洁<br>5. 专项清洁';
        } else if (userMessage.includes('服务范围')) {
            response = '目前我们的服务覆盖上海市全境，包括：<br>1. 浦东新区<br>2. 徐汇区<br>3. 静安区<br>4. 黄浦区等';
        } else if (userMessage.includes('投诉') || userMessage.includes('建议')) {
            response = '感谢您的反馈！您可以：<br>1. 拨打投诉热线：400-xxx-xxxx<br>2. 发送邮件至：feedback@example.com<br>3. 在线提交反馈表单';
        } else {
            response = '感谢您的咨询，请问还有什么可以帮您的吗？';
        }
        
        setTimeout(() => {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message ai-message';
            messageDiv.innerHTML = `
                <i class="fas fa-robot"></i>
                <div class="message-content">
                    <p>${response}</p>
                </div>
            `;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 500);
    }
}); 