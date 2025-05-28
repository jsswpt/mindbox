type TemplateProps = {
    // TODO: удалить
    isFallback?: boolean
}

export const Template = ({ isFallback }: TemplateProps) => (
    <>'IndexPage' template {isFallback ? 'fallback' : 'component'}</>
)
