import { h } from 'preact';

const ScoreHeader = (props: { score: number[], countdown: number }) => {
    return (
        <div class="columns is-mobile">
            <div class="column is-one-third-mobile">
                <div class="score is-blue">
                    <p class="title is-1 has-text-centered is-white">{props.score[0]}</p>
                </div>
            </div>
            <div class="column is-one-third-mobile">
                <div class="">
                    <p class="title is-1">
                        {props.countdown}
                    </p>
                </div>
            </div>
            <div class="column is-one-third-mobile">
                <div class="score is-red">
                    <p class="title is-1 has-text-centered is-white">{props.score[1]}</p>
                </div>
            </div>
        </div>
    )
}

export default ScoreHeader