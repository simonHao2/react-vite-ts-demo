import { Spinner } from 'reactstrap';

const PageLoadingView = (props: any) => {
    const { noPadding } = props;
    const style: any = {
        textAlign: 'center',
        paddingTop: noPadding ?0: 200,
        paddingBottom: noPadding ?0: 200,
        fontSize: 20
    };
    //type="grow"
    return (
        <div style={style}>
            <Spinner style={{ width: '5rem', height: '5rem' }} color="primary" />
            <div>{props.message ? props.message : 'Loading'}</div>
        </div>
    );
};
export default PageLoadingView;
