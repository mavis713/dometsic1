// 初始化AOS动画库
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// 优化导航栏滚动
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
let scrollTimeout;

window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        // 向下滚动
        navbar.classList.add('navbar-scrolled');
        navbar.classList.remove('navbar-visible');
    } else {
        // 向上滚动
        navbar.classList.remove('navbar-scrolled');
        navbar.classList.add('navbar-visible');
    }
    
    lastScrollTop = currentScroll;
    
    // 节流滚动事件
    scrollTimeout = setTimeout(() => {
        navbar.classList.remove('navbar-scrolled');
        navbar.classList.add('navbar-visible');
    }, 150);
}, { passive: true });

// 优化页面加载
document.addEventListener('DOMContentLoaded', function() {
    // 延迟加载图片
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // 优化AOS动画
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        disable: 'mobile' // 在移动端禁用动画
    });
    
    // 添加页面过渡效果
    document.body.classList.add('page-transition', 'visible');
});

// 优化页面切换
document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.hostname === window.location.hostname) {
            if (!this.hash && this.pathname !== window.location.pathname) {
                e.preventDefault();
                document.body.classList.remove('visible');
                setTimeout(() => {
                    window.location.href = this.href;
                }, 300);
            }
        }
    });
});

// 优化移动端菜单
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
        document.body.style.overflow = 
            navbarCollapse.classList.contains('show') ? 'auto' : 'hidden';
    });
    
    // 点击链接后自动关闭菜单
    navbarCollapse.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbarCollapse.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    });
}

// 优化滚动性能
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            // 在这里处理所有滚动相关的视觉更新
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// AI助手交互
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.querySelector('.chat-input input');
    const chatMessages = document.querySelector('.chat-messages');
    const sendButton = document.querySelector('.chat-input .btn');
    const quickQuestions = document.querySelectorAll('.quick-questions button');

    // 发送消息函数
    function sendMessage(message, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        
        const icon = document.createElement('i');
        icon.className = isUser ? 'fas fa-user' : 'fas fa-robot';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `<p>${message}</p>`;
        
        messageDiv.appendChild(icon);
        messageDiv.appendChild(content);
        chatMessages.appendChild(messageDiv);
        
        // 滚动到底部
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // 如果是用户消息，模拟AI回复
        if (isUser) {
            setTimeout(() => {
                sendMessage('我明白了，让我为您查找相关信息...', false);
            }, 1000);
        }
    }

    // 发送按钮点击事件
    sendButton.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message) {
            sendMessage(message);
            chatInput.value = '';
        }
    });

    // 输入框回车事件
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const message = this.value.trim();
            if (message) {
                sendMessage(message);
                this.value = '';
            }
        }
    });

    // 快速问题点击事件
    quickQuestions.forEach(button => {
        button.addEventListener('click', function() {
            sendMessage(this.textContent, true);
        });
    });
});

// 服务卡片hover效果增强
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.icon-wrapper').style.background = 'var(--primary-green)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.icon-wrapper').style.background = 'var(--primary-blue)';
    });
});

// 展开/收起更多筛选条件
document.querySelector('.toggle-more-filters').addEventListener('click', function() {
    const moreFilters = document.querySelector('.more-filters');
    const moreText = this.querySelector('.more-text');
    const lessText = this.querySelector('.less-text');
    
    moreFilters.style.display = moreFilters.style.display === 'none' ? 'block' : 'none';
    moreText.style.display = moreText.style.display === 'none' ? 'inline' : 'none';
    lessText.style.display = lessText.style.display === 'none' ? 'inline' : 'none';
    this.classList.toggle('active');
});

// 打开阿姨详情弹窗
document.querySelectorAll('.nanny-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('btn')) {
            const modal = new bootstrap.Modal(document.getElementById('nannyDetailModal'));
            modal.show();
        }
    });
});

// 收藏功能
document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation(); // 阻止冒泡，避免触发卡片点击
        this.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        
        // 显示收藏提示
        const toast = new bootstrap.Toast(document.getElementById('favoriteToast'));
        toast.show();
        
        // 这里可以添加收藏/取消收藏的API调用
        const nannyId = this.closest('.nanny-card').dataset.nannyId;
        const isFavorite = this.classList.contains('active');
        console.log(`阿姨ID: ${nannyId}, 收藏状态: ${isFavorite}`);
    });
});

// 预约面试表单处理
document.querySelectorAll('.nanny-card .btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const modal = new bootstrap.Modal(document.getElementById('appointmentModal'));
        
        // 更新表单中的阿姨信息
        const nannyCard = this.closest('.nanny-card');
        const nannyImg = nannyCard.querySelector('.nanny-avatar').src;
        const nannyName = nannyCard.querySelector('h3').textContent;
        const nannyLevel = nannyCard.querySelector('.nanny-badge').textContent;
        
        const appointmentForm = document.getElementById('appointmentModal');
        appointmentForm.querySelector('.nanny-thumb').src = nannyImg;
        appointmentForm.querySelector('.selected-nanny h6').textContent = nannyName;
        appointmentForm.querySelector('.selected-nanny p').textContent = nannyLevel;
        
        modal.show();
    });
});

// 面试方式切换
document.querySelectorAll('input[name="interviewType"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const locationInput = document.querySelector('.location-input');
        locationInput.style.display = this.value === 'offline' ? 'block' : 'none';
        locationInput.required = this.value === 'offline';
    });
});

// 表单提交处理
document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 这里可以添加表单数据的API提交
    const formData = new FormData(this);
    console.log('预约信息：', Object.fromEntries(formData));
    
    // 显示提交成功提示
    const modal = bootstrap.Modal.getInstance(document.getElementById('appointmentModal'));
    modal.hide();
    
    // 可以添加预约成功的提示
    alert('预约成功！我们会尽快与您联系确认面试时间。');
}); 