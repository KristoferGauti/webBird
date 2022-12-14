import React, { useEffect, useRef } from "react";
import styles from "./canvas.module.css";
import {
    acceleration,
    birdJumpingPower,
    frameRate,
    gravity,
} from "./gameSettings";

const FlappyBirdCanvas = (props: any): React.ReactElement => {
    const canvas = useRef<HTMLCanvasElement>(null);
    let jumpPower = 0;

    const drawBackground = (ctx: CanvasRenderingContext2D) => {
        ctx.canvas.width = window.innerWidth * 0.9;
        ctx.canvas.height = window.innerHeight - 200;
        ctx.fillStyle = "#A3E8FD";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };

    const drawPipe = (
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        ctx: CanvasRenderingContext2D,
        pipeHeight1: number,
        pipeHeight2: number
    ) => {
        const pipeWidth = 100;
        ctx.fillStyle = "#2CB01A";

        ctx.fillRect(x1, y1, pipeWidth, pipeHeight1); // Top pipe
        ctx.fillRect(x2, y2 - pipeHeight2, pipeWidth, pipeHeight2); // Bottom pipe
    };

    const update = (
        ctx: CanvasRenderingContext2D,
        bird_img: HTMLImageElement
    ) => {
        let birdX = 160;
        let birdY = ctx.canvas.height / 2;
        let pipeX = window.innerWidth - 400;

        return () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            drawBackground(ctx);
            ctx.drawImage(bird_img, birdX, birdY, 50, 50);

            drawPipe(pipeX, 0, pipeX, ctx.canvas.height, ctx, 100, 300);
            drawPipe(
                pipeX - 400,
                0,
                pipeX - 400,
                ctx.canvas.height,
                ctx,
                100,
                300
            );

            // console.log(pipeX);
            // console.log("height", ctx.canvas.height);

            pipeX -= 5;
            birdY -= jumpPower;
            birdY += gravity;
            jumpPower *= acceleration;

            if (birdY > ctx.canvas.height) {
                birdY = 0;
            }
            if (birdY < 0) {
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
                    () => {
                        setInterval(update(ctx, bird_img), frameRate);
                    },
                    false
                );
            }
        }
    }, []);

    return (
        <div
            style={{ textAlign: "center" }}
            onClick={() => {
                jumpPower = birdJumpingPower;
            }}>
            <canvas className={styles.canvas} ref={canvas} {...props} />
        </div>
    );
};

export default FlappyBirdCanvas;
