// Estado do sistema
let projectorOn = true;
let currentSlide = 1;
let lightsOn = true;
let currentLightMode = 'normal';
let computersOn = false;

// Slides para o telão
const slides = [
    "🖥️ LABORATÓRIO DE INFORMÁTICA\n\nSistema Operacional: Ubuntu Linux\n\n20 Estações Disponíveis\n\nDesenvolvimento Web\nProgramação Python\nBanco de Dados\n\nPressione 'P' para controlar o projetor",
    "📚 CURSOS DISPONÍVEIS\n\n• Programação Web (HTML, CSS, JS)\n• Python para Iniciantes\n• Banco de Dados MySQL\n• Design Gráfico\n• Redes de Computadores\n• Segurança Digital\n\nPressione 'T' para próximo slide",
    "🔧 FERRAMENTAS INSTALADAS\n\n• Visual Studio Code\n• PyCharm Community\n• GIMP\n• LibreOffice\n• Chrome/Firefox\n• MySQL Workbench\n• Git/GitHub Desktop\n\nTodas as estações atualizadas!",
    "📋 NORMAS DO LABORATÓRIO\n\n• Não consumir alimentos\n• Manter silêncio\n• Salvar trabalhos na nuvem\n• Relatar problemas técnicos\n• Desligar computadores ao sair\n\nBom trabalho a todos!"
];

document.addEventListener('DOMContentLoaded', function() {
    const scene = document.querySelector('a-scene');
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Esconder tela de loading
    scene.addEventListener('loaded', function() {
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1500);
    });

    // Interações com objetos clicáveis
    setupInteractions();
    
    // Controles de teclado
    setupKeyboardControls();
    
    console.log('🖥️ Laboratório de Informática carregado!');
    console.log('📽️ Projetor: LIGADO | 💡 Luzes: LIGADO | 🖥️ Computadores: DESLIGADO');
});

function setupInteractions() {
    const interactiveObjects = document.querySelectorAll('.interactive');
    
    interactiveObjects.forEach((obj, index) => {
        obj.addEventListener('click', function() {
            if (this.classList.contains('computer-screen')) {
                toggleComputerScreen(this);
            } else if (this.id === 'mainScreen') {
                nextSlide();
            } else if (this.id === 'projector') {
                toggleProjector();
            }
            
            // Efeito visual no clique
            this.setAttribute('animation__click', {
                property: 'scale',
                from: '1 1 1',
                to: '1.05 1.05 1.05',
                dur: 200,
                direction: 'alternate',
                loop: 2
            });
        });

        obj.addEventListener('mouseenter', function() {
            this.setAttribute('animation__hover', {
                property: 'scale',
                to: '1.02 1.02 1.02',
                dur: 100
            });
        });

        obj.addEventListener('mouseleave', function() {
            this.setAttribute('animation__hover', {
                property: 'scale',
                to: '1 1 1',
                dur: 100
            });
        });
    });
}

function setupKeyboardControls() {
    document.addEventListener('keydown', function(event) {
        const camera = document.getElementById('cameraRig');
        
        switch(event.code) {
            case 'KeyR':
                camera.setAttribute('position', '0 3.2 18');
                camera.setAttribute('rotation', '0 0 0');
                console.log('🎯 Câmera resetada - virada para o laboratório');
                break;
                
            case 'KeyQ':
                adjustCameraHeight(0.5);
                break;
                
            case 'KeyZ':
                adjustCameraHeight(-0.5);
                break;
                
            case 'KeyF':
                toggleFullscreen();
                break;
                
            case 'KeyP':
                toggleProjector();
                break;
                
            case 'KeyT':
                nextSlide();
                break;
                
            case 'KeyC':
                toggleAllComputers();
                break;
                
            case 'KeyL':
                toggleLights();
                break;
                
            case 'Digit1':
                setLightingMode('normal');
                break;
                
            case 'Digit2':
                setLightingMode('yellow');
                break;
                
            case 'Digit3':
                setLightingMode('blue');
                break;
                
            case 'Digit4':
                setLightingMode('presentation');
                break;
        }
    });
}

function toggleProjector() {
    const screen = document.getElementById('mainScreen');
    const projector = document.getElementById('projector');
    let projectorLight = document.getElementById('projectorLight');
    
    projectorOn = !projectorOn;
    
    if (projectorOn) {
        // Tela ligada - tom azul escuro mais brilhante
        screen.setAttribute('color', '#1a1a2e');
        screen.setAttribute('material', {
            opacity: 1.0,
            emissive: '#0066cc',
            emissiveIntensity: 0.1,
            roughness: 0.1,
            metalness: 0.2
        });
        projector.setAttribute('color', '#34495e');
        
        // Criar luz do projetor se não existir
        if (!projectorLight) {
            projectorLight = document.createElement('a-light');
            projectorLight.setAttribute('id', 'projectorLight');
            projectorLight.setAttribute('type', 'spot');
            projectorLight.setAttribute('position', '0 4.5 -10');
            projectorLight.setAttribute('target', '#mainScreen');
            projectorLight.setAttribute('color', '#87ceeb');
            projectorLight.setAttribute('intensity', 0.8);
            projectorLight.setAttribute('angle', 20);
            projectorLight.setAttribute('penumbra', 0.3);
            document.querySelector('a-scene').appendChild(projectorLight);
        } else {
            projectorLight.setAttribute('intensity', 0.8);
            projectorLight.setAttribute('color', '#87ceeb');
        }
        
        console.log('📽️ Projetor LIGADO - Tela com brilho sutil');
    } else {
        // Tela desligada - mais escura
        screen.setAttribute('color', '#2c3e50');
        screen.setAttribute('material', {
            opacity: 0.3,
            emissive: '#000000',
            emissiveIntensity: 0,
            roughness: 0.8,
            metalness: 0
        });
        projector.setAttribute('color', '#7f8c8d');
        
        // Desligar luz do projetor
        if (projectorLight) {
            projectorLight.setAttribute('intensity', 0);
        }
        
        console.log('📽️ Projetor DESLIGADO');
    }
}

function nextSlide() {
    if (!projectorOn) return;
    
    currentSlide = (currentSlide % slides.length) + 1;
    const screenContent = document.getElementById('screenContent');
    screenContent.setAttribute('value', slides[currentSlide - 1]);
    
    console.log(`📊 Slide ${currentSlide}/${slides.length}`);
}

function toggleAllComputers() {
    computersOn = !computersOn;
    const screens = document.querySelectorAll('.computer-screen');
    
    screens.forEach(screen => {
        if (computersOn) {
            screen.setAttribute('color', '#00ff00');
        } else {
            screen.setAttribute('color', '#0066cc');
        }
    });
    
    console.log(`🖥️ Computadores: ${computersOn ? 'LIGADOS' : 'DESLIGADOS'}`);
}

function toggleComputerScreen(screen) {
    const currentColor = screen.getAttribute('color');
    const newColor = currentColor === '#0066cc' ? '#00ff00' : '#0066cc';
    screen.setAttribute('color', newColor);
    
    const isOn = newColor === '#00ff00';
    console.log(`💻 ${screen.id}: ${isOn ? 'LIGADO' : 'DESLIGADO'}`);
}

function toggleLights() {
    lightsOn = !lightsOn;
    
    if (lightsOn) {
        setLightingMode(currentLightMode);
    } else {
        setLightingMode('off');
    }
}

function setLightingMode(mode) {
    const ambientLight = document.getElementById('ambientLight');
    const mainLight = document.getElementById('mainLight');
    const ceilingLights = document.querySelectorAll('.ceiling-light');
    const scene = document.querySelector('a-scene');
    
    if (mode !== 'off') {
        currentLightMode = mode;
        lightsOn = true;
    }
    
    switch(mode) {
        case 'normal':
            ambientLight.setAttribute('light', {intensity: 0.4, color: '#ffffff'});
            mainLight.setAttribute('light', {intensity: 1.0, color: '#ffffff'});
            ceilingLights.forEach(light => {
                light.setAttribute('light', {intensity: 0.8, color: '#f8f8ff'});
            });
            scene.setAttribute('background', 'color', '#f0f5ff');
            console.log('💡 Luz NORMAL ativada');
            break;
            
        case 'yellow':
            ambientLight.setAttribute('light', {intensity: 0.3, color: '#fff8dc'});
            mainLight.setAttribute('light', {intensity: 0.8, color: '#ffd700'});
            ceilingLights.forEach(light => {
                light.setAttribute('light', {intensity: 0.7, color: '#ffd700'});
            });
            scene.setAttribute('background', 'color', '#fffacd');
            console.log('🟡 Luz AMARELA ativada');
            break;
            
        case 'blue':
            ambientLight.setAttribute('light', {intensity: 0.3, color: '#e6f3ff'});
            mainLight.setAttribute('light', {intensity: 0.8, color: '#87ceeb'});
            ceilingLights.forEach(light => {
                light.setAttribute('light', {intensity: 0.7, color: '#87ceeb'});
            });
            scene.setAttribute('background', 'color', '#e6f3ff');
            console.log('🔵 Luz AZUL ativada');
            break;
            
        case 'presentation':
            ambientLight.setAttribute('light', {intensity: 0.2, color: '#ffffff'});
            mainLight.setAttribute('light', {intensity: 0.4, color: '#ffffff'});
            ceilingLights.forEach(light => {
                light.setAttribute('light', {intensity: 0.3, color: '#f8f8ff'});
            });
            scene.setAttribute('background', 'color', '#2c3e50');
            console.log('🎬 Modo APRESENTAÇÃO ativado');
            break;
            
        case 'off':
            ambientLight.setAttribute('light', {intensity: 0.05, color: '#ffffff'});
            mainLight.setAttribute('light', {intensity: 0, color: '#ffffff'});
            ceilingLights.forEach(light => {
                light.setAttribute('light', {intensity: 0, color: '#ffffff'});
            });
            scene.setAttribute('background', 'color', '#1a1a2e');
            lightsOn = false;
            console.log('⚫ Luzes DESLIGADAS');
            break;
    }
}

function adjustCameraHeight(delta) {
    const camera = document.getElementById('cameraRig');
    const currentPos = camera.getAttribute('position');
    const newY = Math.max(0.5, Math.min(8, currentPos.y + delta));
    camera.setAttribute('position', `${currentPos.x} ${newY} ${currentPos.z}`);
    console.log(`📐 Altura da câmera: ${newY.toFixed(1)}m`);
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        console.log('🖥️ Modo tela cheia ATIVADO');
    } else {
        document.exitFullscreen();
        console.log('🖥️ Modo tela cheia DESATIVADO');
    }
}
