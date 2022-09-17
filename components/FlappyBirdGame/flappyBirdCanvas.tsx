import React, { useEffect, useRef, useState } from "react";
import styles from "./canvas.module.css";
import { BIRD_JUMPING_POWER } from "./gameSettings";

const FlappyBirdCanvas = (props: any): React.ReactElement => {
    const canvas = useRef<HTMLCanvasElement>(null);
    let posX = 160;
    let posY = 320;
    let isJumping = false;

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

    useEffect(() => {
        if (canvas.current) {
            const ctx = canvas.current.getContext("2d");
            if (ctx) {
                drawBird(posX, posY, ctx);
                setInterval(() => {
                    if (isJumping) {
                        drawBird(posX, posY, ctx);
                        isJumping = false;
                    }
                });
            }
        }
    }, []);

    return (
        <div
            style={{ textAlign: "center" }}
            onClick={() => {
                posY -= BIRD_JUMPING_POWER;
                isJumping = true;
            }}>
            <canvas className={styles.canvas} ref={canvas} {...props} />
        </div>
    );
};

export default FlappyBirdCanvas;
