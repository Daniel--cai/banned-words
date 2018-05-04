import { h } from 'preact'
import classnames from 'classnames';
import './style.css'

const KeywordHeader = (props: { keywords: string[], correct?: string[] }) => {
    return (
        <table class="keyword-header">
            <tr>
                {props.keywords.map(keyword => {
                    const answered = props.correct == null || props.correct.indexOf(keyword) == -1
                    return <td>
                        <b class={classnames({ 'is-invisible': !answered })}>
                            {keyword}
                        </b>
                    </td>
                })}
            </tr>
        </table>
    )
}

export default KeywordHeader