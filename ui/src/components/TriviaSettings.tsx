import React from 'react'
import {OptionWrapper} from './TriviaSettings.style'
import {TriviaOption} from "../App";

type Props = {
    categories: TriviaOption[]
    nbOfQuestions: TriviaOption[]
    difficulty: TriviaOption[]
}

const TriviaSettings: React.FC<Props> = ({categories}) => {

    const select = (e: React.MouseEvent<HTMLButtonElement>, triviaOptions: TriviaOption[]) => {
        triviaOptions.forEach(opt => opt.selected = opt.option === e.currentTarget.value)
    }

    return (
        <div>
            <p> Category </p>
            <div>
                {categories.map(cat => (
                    <OptionWrapper
                        key={cat.option}
                        selected={cat.selected}>
                        <div key={cat.option}>
                            <button value={cat.option} onClick={(e) => select(e, categories)}>
                                {cat.option}
                            </button>
                        </div>
                    </OptionWrapper>
                ))}
            </div>
        </div>)
}

export default TriviaSettings