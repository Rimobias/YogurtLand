const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#111111",
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);

let score = 0;
let scoreText;
let timeLeft = 30;
let timeText;
let gameOver = false;
let target;

function preload() {
  // 로고 이미지 로드
  this.load.image("logo", "assets/logo.png");
  this.load.image("target", "assets/whitehead.png");
}

function create() {
  // 로고 표시
  this.add.image(400, 80, "logo").setScale(0.4);

  // 브랜드 문구
  this.add.text(400, 140, "Challenge Your Speed", {
    fontSize: "20px",
    color: "#cccccc"
  }).setOrigin(0.5);

  // 점수
  scoreText = this.add.text(50, 30, "Score: 0", {
    fontSize: "24px",
    color: "#00ffcc"
  });

  // 타이머
  timeText = this.add.text(650, 30, "Time: 30", {
    fontSize: "24px",
    color: "#ffcc00"
  });

  // 타겟
  target = this.add.image(400, 350, "target");
  target.setScale(0.15);
  target.setInteractive();

  target.on("pointerdown", () => {
    if (gameOver) return;

    score += 1;
    scoreText.setText("Score: " + score);
    moveTarget();
  });

  // 타이머 이벤트
  this.time.addEvent({
    delay: 1000,
    callback: () => {
      if (gameOver) return;

      timeLeft -= 1;
      timeText.setText("Time: " + timeLeft);

      if (timeLeft <= 0) {
        endGame.call(this);
      }
    },
    loop: true
  });
}

function moveTarget() {
  const x = Phaser.Math.Between(50, 750);
  const y = Phaser.Math.Between(200, 550);
  target.setPosition(x, y);
}

function endGame() {
  gameOver = true;
  target.destroy();

  this.add.text(400, 300, "GAME OVER", {
    fontSize: "40px",
    color: "#ff5555"
  }).setOrigin(0.5);

  this.add.text(400, 350, "Final Score: " + score, {
    fontSize: "28px",
    color: "#ffffff"
  }).setOrigin(0.5);

  // CTA 버튼
  const button = this.add.rectangle(400, 420, 220, 50, 0x00ffcc);
  button.setInteractive();

  const buttonText = this.add.text(400, 420, "Visit Our Brand", {
    fontSize: "20px",
    color: "#000000"
  }).setOrigin(0.5);

  button.on("pointerdown", () => {
    window.open("https://www.yogurtland.com/", "_blank");
  });
}
