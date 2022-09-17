import React, { useEffect, useRef, useState } from "react";
import styles from "./canvas.module.css";
import { BIRD_JUMPING_POWER } from "./gameSettings";

const FlappyBirdCanvas = (props: any): React.ReactElement => {
    const canvas = useRef<HTMLCanvasElement>(null);
    let frameRate = 40;
    let jumpPower = 0;
    let gravity = 15;
    let acceleration = 0.9;

    const update = (
        ctx: CanvasRenderingContext2D,
        bird_img: HTMLImageElement
    ) => {
        let birdX = 160;
        let birdY = ctx.canvas.height / 2;

        return function () {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            console.log(birdY);

            ctx.canvas.width = window.innerWidth * 0.9;
            ctx.canvas.height = window.innerHeight - 200;
            ctx.fillStyle = "#A3E8FD";
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.drawImage(bird_img, birdX, birdY, 50, 50);

            birdY -= jumpPower;
            birdY += gravity;
            jumpPower *= acceleration;

            if (birdY > ctx.canvas.height) {
                birdY = 0;
            }
        };
    };

    useEffect(() => {
        if (canvas.current) {
            const ctx = canvas.current.getContext("2d");
            if (ctx) {
                const bird_img = new Image();
                bird_img.src = "/flappy_bird.png";

                bird_img.addEventListener(
                    "load",
                    function () {
                        setInterval(update(ctx, bird_img), frameRate);
                    },
                    false
                );

                // drawBird(posX, posY, ctx);
                // setInterval(() => {
                //     if (isJumping) {
                //         drawBird(posX, posY, ctx);
                //         isJumping = false;
                //     }
                // });
            }
        }
    }, []);

    return (
        <div
            style={{ textAlign: "center" }}
            onClick={() => {
                jumpPower = BIRD_JUMPING_POWER;
            }}>
            <canvas className={styles.canvas} ref={canvas} {...props} />
        </div>
    );
};

export default FlappyBirdCanvas;
