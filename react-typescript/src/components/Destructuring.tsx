type Props = {
    title: string,
    content: string,
    commentsQty: number,
    tags: string[],
    category: Category
}

export enum Category {
    JS = "JavaScript",
    TS = "TypeScript",
    P = "Python"
}

const Destructuring = ({ title, content, commentsQty, tags, category }: Props) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{content}</p>
            <p>Comments quantity: {commentsQty}</p>
            <p>{ tags.map(tag => (
                <span>#{tag}</span>
            )) }</p>
            <h4>Category: {category}</h4>
        </div>
    )
}

export default Destructuring;