import React, { useEffect, useState, useRef } from 'preact/compat';
import useSound from './hooks/useSound';
import usePrevious from './hooks/usePrevious';

import './Walkman.css';

const REWIND_FF_RATE = 30;
const MAX_ROTATION_Y = 35;
const MIN_ROTATION_Y = -35;
const MAX_ROTATION_X = 20;
const MIN_ROTATION_X = -20;

const limitWithResistance = (input: number, lowerLimit: number, upperLimit: number): number => {
    if (input >= lowerLimit && input <= upperLimit) {
        return input;
    } else if (input < lowerLimit) {
        return lowerLimit - Math.log(lowerLimit - input + 1) * 2;
    } else {
        return upperLimit + Math.log(input - upperLimit + 1) * 2;
    }
}

const Walkman = () => {
    const [playClickSfx] = useSound('/sounds/walkman/button_click_sfx_2.mp3', { interrupt: true });
    const [playRewindSfx, { stop: stopRewindSfx }] = useSound('/sounds/walkman/walkman_rewind.mp3', { interrupt: true });
    const [playFastForwardSfx, { stop: stopFastForwardSfx }] = useSound('/sounds/walkman/walkman_ff.mp3', { interrupt: true });
    const [playInsertSfx] = useSound('/sounds/walkman/walkman_tape_insert.mp3', { interrupt: true });

    // Walkman state
    const [walkmanState, setWalkmanState] = useState<'playing' | 'stopped' | 'ff' | 'rewind' | 'ejecting' | 'ejected'>('stopped');
    const previousWalkmanState = usePrevious(walkmanState);
    const [timeStart, setTimeStart] = useState<Date>(new Date());
    const songRef = useRef<HTMLAudioElement>(null);
    const [selectedTape, setSelectedTape] = useState<number>(1);

    // state helpers
    const isPlaying = walkmanState === 'playing';
    const isStopped = walkmanState === 'stopped';
    const isFastForwarding = walkmanState === 'ff';
    const isRewinding = walkmanState === 'rewind';
    const isEjecting = walkmanState === 'ejecting';
    const isEjected = walkmanState === 'ejected';


    // camera
    const [rotationY, setRotationY] = useState<number>(-35);
    const [rotationX, setRotationX] = useState<number>(10);
    const [rotationZ, setRotationZ] = useState<number>(0);

    // UI state
    const [ejectButtonPressed, setEjectButtonPressed] = useState<boolean>(false);

    // UI logic
    const onPlayButtonClick = () => {
        if (songRef.current) {
            songRef.current.volume = 0.7;
        }
        songRef.current?.play();
    }

    const onStopButtonClick = () => {
        songRef.current?.pause();
    }

    const adjustSongTime = (delta: number) => {
        if (songRef.current) {
            songRef.current.currentTime += delta;
        }
    }

    useEffect(() => {
        if (walkmanState === 'rewind' || walkmanState === 'ff') {
            setTimeStart(new Date());

            if (walkmanState === 'rewind') {
                // calculate how much is left of tape, and set a timeout to stop rewinding
                const secondsLeft = songRef.current?.currentTime || 0;

                const timeout = setTimeout(() => {
                    if (walkmanState === 'rewind') {
                        setWalkmanState('stopped');
                        /*console.log('stopping rewind')
                        console.log(songRef.current)*/

                        if (songRef.current) {
                            songRef.current.currentTime = 0;
                        }
                    }
                }, secondsLeft * 1000 / REWIND_FF_RATE);

                return () => {
                    // clears timeout before running the new effect
                    clearTimeout(timeout);
                };
            }

            if (walkmanState === 'ff') {
                if (!songRef.current?.duration) return;

                // calculate how much is left of tape, and set a timeout to stop rewinding
                const secondsLeft = songRef.current?.duration - (songRef.current?.currentTime || 0);

                const timeout = setTimeout(() => {
                    if (walkmanState === 'ff') {
                        setWalkmanState('stopped');
                        /*console.log('stopping ff')
                        console.log(songRef.current)*/

                        if (songRef.current) {
                            songRef.current.currentTime = songRef.current.duration;
                        }
                    }
                }, secondsLeft * 1000 / REWIND_FF_RATE);

                return () => {
                    // clears timeout before running the new effect
                    clearTimeout(timeout);
                };
            }
        }

        if (previousWalkmanState === 'rewind' || previousWalkmanState === 'ff') {
            const secondsElapsed = (new Date().getTime() - timeStart.getTime()) / 1000 * REWIND_FF_RATE;

            // console.log(secondsElapsed)

            adjustSongTime(previousWalkmanState === 'rewind' ? -secondsElapsed : secondsElapsed);
        }
    }, [walkmanState]);

    // sfx effect
    useEffect(() => {
        if (walkmanState === 'rewind') {
            playRewindSfx();
        } else {
            stopRewindSfx();
        }

        if (walkmanState === 'ff') {
            playFastForwardSfx();
        } else {
            stopFastForwardSfx();
        }
    }, [walkmanState]);

    useEffect(() => {
        if (walkmanState === 'ejecting') {
            playInsertSfx();
        }
    }, [selectedTape]);

    useEffect(() => {
        if (isPlaying) {
            onPlayButtonClick();
        } else {
            onStopButtonClick();
        }
    }, [isPlaying]);

    // camera logic
    const mouseDownX = useRef<number>(0);
    const mouseDownY = useRef<number>(0);

    const onMouseMove = (event: any) => {
        //console.log(event);


        const deltaX = event.clientX - mouseDownX.current;
        const deltaY = event.clientY - mouseDownY.current;

        const newRotationY = rotationY + deltaX * 0.4;
        setRotationY(limitWithResistance(newRotationY, MIN_ROTATION_Y, MAX_ROTATION_Y));
        

        const newRotationX = rotationX - deltaY * 0.4;
        setRotationX(limitWithResistance(newRotationX, MIN_ROTATION_X, MAX_ROTATION_X));
      };
    
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
    
      const onMouseDown = (event: any) => {
        event.preventDefault();

        mouseDownX.current = event.clientX;
        mouseDownY.current = event.clientY;

        //console.log(event)

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      };


    return (
        <div className="walkman-wrapper">
            <audio ref={songRef} src={`https://files.simse.io/walkman/song_${selectedTape}.mp3`} loop={false} onEnded={() => setWalkmanState('stopped')} preload='auto' />
            
            <div 
                className={`walkman ${isEjecting || isEjected ? 'cover-open' : 'tape-in'} ${isPlaying ? 'playing' : ''} ${isFastForwarding ? 'forward' : ''} ${isRewinding ? 'rewind' : ''}`}
                style={{ '--rotation-y': `${rotationY}deg`, '--rotation-x': `${rotationX}deg`, '--rotation-z': `${rotationZ}deg`} as React.CSSProperties}
                onMouseDown={onMouseDown}
            >
                <div className="cube walkman-top">
                    <div className="sides-x"></div>
                    <div className="sides-z"></div>
                    <div className="cube hot-line transition-03">
                        <div className="sides-x"></div>
                        <div className="sides-z"></div>
                    </div>
                    <div className="headphone-inputs">
                        <span><span></span></span>
                        <span><span></span></span>
                    </div>
                    <div className="operation transition-03"></div>
                </div>
                <div className="cube walkman-base">
                    <div className="sides-x"></div>
                    <div className="sides-z"></div>
                    <div className="swing-arm"></div>
                    <div className="base-decals">
                        <p>STEREO</p>
                    </div>
                </div>

                <div className="cube walkman-foot">
                    <div className="sides-x"></div>
                    <div className="sides-z"></div>
                    <div className="foot-decals">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <span className="screws">
                            <span className="screw sc-1"></span>
                            <span className="screw sc-2"></span>
                            <span className="screw sc-3"></span>
                        </span>
                        <div className="tone">
                            <div className="tone-switch">
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                            <span>High<br />Low</span>
                        </div>
                    </div>
                    <span className="hover-helpers transition-05"></span>
                </div>

                <div className="walkman-bay">
                    <div className="guides-heads">
                        <div className="guide"></div>
                        <div className="guide"></div>
                        <div className="guide"></div>
                        <div className="guide"></div>
                    </div>
                    <div className="spooler-plates">
                        <div className="plate"></div>
                        <div className="spooler-plate"></div>
                        <div className="spooler-plate"></div>
                    </div>

                    {[1, 2, 3, 4].map((i) => (
                        <div className={`shape cylinder guide-spool guide${i}`} key={`guide-${i}`}>
                            <div className="face bm">
                                <div className="shader" style={{ backgroundColor: "rgba(0, 0, 0, 0.0666667)" }}></div>
                            </div>
                            <div className="face tp">
                                <div className="shader" style={{ backgroundColor: "rgba(0, 0, 0, 0.0666667)" }}></div>
                            </div>
                            <div className="face side s0">
                                <div className="shader" style={{ backgroundColor: "rgba(0, 0, 0, 0.14902)" }}></div>
                            </div>
                            <div className="face side s1">
                                <div className="shader" style={{ backgroundColor: "rgba(0, 0, 0, 0.337255)" }}></div>
                            </div>
                            <div className="face side s2">
                                <div className="shader" style={{ backgroundColor: "rgba(0, 0, 0, 0.513726)" }}></div>
                            </div>
                            <div className="face side s3">
                                <div className="shader" style={{ backgroundColor: "rgba(0, 0, 0, 0.584314)" }}></div>
                            </div>
                            <div className="face side s4">
                                <div className="shader" style={{ backgroundColor: "rgba(0, 0, 0, 0.45098)" }}></div>
                            </div>
                            <div className="face side s5">
                                <div className="shader" style={{ backgroundColor: "rgba(0, 0, 0, 0.262745)" }}></div>
                            </div>
                            <div className="face side s6">
                                <div className="shader" style={{ backgroundColor: "rgba(0, 0, 0, 0.0823529)" }}></div>
                            </div>
                            <div className="face side s7">
                                <div className="shader" style={{ backgroundColor: "rgba(0, 0, 0, 0.0117647)" }}></div>
                            </div>
                        </div>
                    ))}

                    {[1, 2].map((i) => (
                        <div className={`shape cylinder tape-spool tape-spool-${i}`} key={`tape-spool-${i}`}>
                            <div className="face bm">
                                <div className="shader" style={{ backgroundColor: "rgba(255, 255, 255, 0.0666667)" }}></div>
                            </div>
                            <div className="face tp">
                                <div className="shader" style={{ backgroundColor: "rgba(255, 255, 255, 0.0666667)" }}></div>
                                <div className="direction-decal">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                            <div className="face side s0">
                                <div className="shader" style={{ backgroundColor: "rgba(255, 255, 255, 0.14902)" }}></div>
                            </div>
                            <div className="face side s1">
                                <div className="shader" style={{ backgroundColor: "rgba(255, 255, 255, 0.337255)" }}></div>
                            </div>
                            <div className="face side s2">
                                <div className="shader" style={{ backgroundColor: "rgba(255, 255, 255, 0.513726)" }}></div>
                            </div>
                            <div className="face side s3">
                                <div className="shader" style={{ backgroundColor: "rgba(255, 255, 255, 0.584314)" }}></div>
                            </div>
                            <div className="face side s4">
                                <div className="shader" style={{ backgroundColor: "rgba(255, 255, 255, 0.45098)" }}></div>
                            </div>
                            <div className="face side s5">
                                <div className="shader" style={{ backgroundColor: "rgba(255, 255, 255, 0.262745)" }}></div>
                            </div>
                            <div className="face side s6">
                                <div className="shader" style={{ backgroundColor: "rgba(0, 0, 0, 0.0823529)" }}></div>
                            </div>
                            <div className="face side s7">
                                <div className="shader" style={{ backgroundColor: "rgba(0, 0, 0, 0.0117647)" }}></div>
                            </div>

                        </div>
                    ))}
                </div>

                <div className={`cube transition-05 walkman-cover ${(isEjected || isEjecting) ? '' : 'closed'}`} onMouseDown={() => {
                    if (isEjecting) {
                        setWalkmanState('stopped');
                    } else {
                        setWalkmanState('ejecting');
                    }
                }}>
                    <div className="sides-x">
                        <span></span>
                    </div>
                    <div className="sides-z"></div>
                    <div className="window"></div>
                </div>

                <div className="controls">
                    <div className="cube control-base-1">
                        <div className="sides-x"></div>
                        <div className="sides-z"></div>

                        <div className="play">
                            <div className={`cube play-button transition-03  ${isPlaying ? 'pressed' : ''}`} onMouseDown={() => {
                                playClickSfx();
                                setWalkmanState('playing');
                                onPlayButtonClick();
                            }}>
                                <div className="sides-x"></div>
                                <div className="sides-z"></div>
                                <div className="face"></div>
                            </div>
                        </div>

                        <div className="rewind">
                            <div className={`cube rewind-button transition-03 ${isRewinding ? 'pressed' : ''}`} onMouseDown={() => {
                                playClickSfx();
                                setWalkmanState('rewind');
                            }}>
                                <div className="sides-x"></div>
                                <div className="sides-z"></div>
                                <div className="face"></div>
                            </div>
                        </div>

                        <div className="forward">
                            <div className={`cube forward-button transition-03 ${isFastForwarding ? 'pressed' : ''}`} onMouseDown={() => {
                                playClickSfx();
                                setWalkmanState('ff');
                            }}>
                                <div className="sides-x"></div>
                                <div className="sides-z"></div>
                                <div className="face"></div>
                            </div>
                        </div>
                    </div>

                    <div className="cube control-base-2">
                        <div className="sides-x"></div>
                        <div className="sides-z"></div>
                    </div>

                    <div className="cube control-base-3">
                        <div className="sides-x"></div>
                        <div className="sides-z"></div>
                        <div className="mic">
                            <ul>
                                <li></li><li></li><li></li><li></li><li></li>
                                <li></li><li></li><li></li><li></li><li></li>
                                <li></li><li></li><li></li><li></li><li></li>
                                <li></li><li></li><li></li><li></li><li></li>
                                <li></li><li></li><li></li><li></li><li></li>
                            </ul>
                        </div>
                        <div className={`stop-eject`} onMouseDown={() => {
                            playClickSfx();
                            
                            setEjectButtonPressed(true);
                            setTimeout(() => {
                                setEjectButtonPressed(false)
                            }, 200);

                            if (walkmanState === 'ejected') return;

                            if (walkmanState === 'ejecting') {
                                setWalkmanState('ejected');
                            } else if (walkmanState === 'stopped') {
                                setWalkmanState('ejecting')
                            } else {
                                setWalkmanState('stopped');
                                onStopButtonClick();
                            }
                        }} onMouseUp={() => {
                            
                        }}>
                            <div className={`cube stop-eject-button transition-03 ${ejectButtonPressed ? 'pressed' : ''}`}>
                                <div className="sides-x"></div>
                                <div className="sides-z"></div>
                                <div className="face">
                                    <ul>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ul>
                                </div>
                            </div>
                            <span>Stop<br />Eject</span>
                        </div>
                        <span className="mini-sony"></span>

                    </div>

                    <div className="cube control-base-4">
                        <div className="sides-x"></div>
                        <div className="sides-z"></div>
                        <div className="decals">
                            <span className="decal-play"></span>
                            <span className="decal-rewind"></span>
                            <span className="decal-forward"></span>
                        </div>
                    </div>
                </div>

                {[1, 2, 3].map((i) => (<div 
                    className={`tape tape-${i} cube transition-05 ${isEjected || selectedTape !== i ? 'ejected' : 'inserted'} ${!isEjected && selectedTape !== i ? 'hidden' : ''}`}
                    onMouseDown={() => {
                        setSelectedTape(i);
                        if (isEjecting) {
                            setWalkmanState('ejected');
                        } else {
                            setWalkmanState('ejecting');
                        }
                    }}
                    key={`tape-${i}`}
                >
                    <div className="sides-x"></div>
                    <div className="sides-z"></div>

                    <div className="reel-1">
                        <ul className="reel reel-top">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <div className="reel-mid"></div>
                        <ul className="reel reel-bottom">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>

                    <div className="reel-2">
                        <ul className="reel reel-top">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <div className="reel-mid"></div>
                        <ul className="reel reel-bottom">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>

                    <div className="tape-bottom">
                        <span className="tape-film"></span>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Walkman;