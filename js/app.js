const THREE = window.THREE;
const VRButton = window.VRButton;

let camera, scene, renderer;
init();
animate();

function init() {
    // Kamera, sahne ve renderer'ı oluşturun
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 50;

    scene = new THREE.Scene();

    // Rastgele renkte ve rastgele pozisyonlarda 1000 küp oluşturun
    for (let i = 0; i < 1000; i++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const color = new THREE.Color(Math.random(), Math.random(), Math.random());
        const material = new THREE.MeshStandardMaterial({ color: color });

        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50);
        scene.add(cube);
    }

    // Işıklandırma ekleyin
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    // Renderer'ı ve VR düğmesini ayarlayın
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    renderer.xr.setReferenceSpaceType("local"); // Kullanıcının başlangıç pozisyonunu ayarlayın
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(VRButton.createButton(renderer));

    // Pencere yeniden boyutlandırma işlemini yönetin
    window.addEventListener('resize', onWindowResize, false);
}

function animate() {
    renderer.setAnimationLoop((timestamp, frame) => {
        // Kamerayı güncelleyin
        if (frame) {
            const pose = frame.getViewerPose(renderer.xr.getReferenceSpace());
            if (pose) {
                camera.matrix.fromArray(pose.transform.matrix);
                camera.matrix.decompose(camera.position, camera.quaternion, camera.scale);
            }
        }

        render();
    });
}

function render() {
    // Sahneyi çizdirin
    renderer.render(scene, camera);
}

function onWindowResize() {
    // Pencere boyutlandırma işlemini yönetin
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
