interface Props {
    data: any;
}

const ProductMetaReview: React.FC<Props> = ({data}) => {

    const createDescription = ()  => {
        if(data?.description !== undefined){
            return(
                JSON.parse(data?.description).blocks?.map((el: any) => {
                    return(
                        <p className="product__description">{el.data.text}</p>
                    )
                })
            )
        }else{
            return("None")
        }
    }

    return (
            <div>
                {createDescription()}
            </div>
    );
}
;

export default ProductMetaReview;
