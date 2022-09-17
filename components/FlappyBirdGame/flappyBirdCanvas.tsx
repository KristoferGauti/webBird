import React, { useEffect, useRef, useState } from "react";
import styles from "./canvas.module.css";
import { BIRD_JUMPING_POWER } from "./gameSettings";

const FlappyBirdCanvas = (props: any): React.ReactElement => {
    const [isJumping, setIsJumping] = useState(false);
    const canvas = useRef<HTMLCanvasElement>(null);
    let posX = 160;
    let posY = 320;

    const drawBird = (x: number, y: number, ctx: CanvasRenderingContext2D) => {
        ctx.canvas.width = window.innerWidth * 0.9;
        ctx.canvas.height = window.innerHeight - 200;
        ctx.fillStyle = "#A3E8FD";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const bird_img = new Image();
        bird_img.src = "/flappy_bird.png";

        bird_img.onload = () => {
            ctx.drawImage(bird_img, x, y, 50, 50);
        };
    };

    const animate = (ctx: CanvasRenderingContext2D) => {
        setInterval(() => {
            return (() => {
                drawBird(posX, posY, ctx);
            })();
        });
    };

    useEffect(() => {
        if (canvas.current) {
            const ctx = canvas.current.getContext("2d");
            if (ctx) {
                animate(ctx);
            }
        }
    }, []);

    return (
        <div
            style={{ textAlign: "center" }}
            onClick={() => {
                posY -= BIRD_JUMPING_POWER;
            }}>
            <canvas className={styles.canvas} ref={canvas} {...props} />
        </div>
    );
};

export default FlappyBirdCanvas;
