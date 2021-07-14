import { useSelector } from 'react-redux';
// import { addData } from '../reducers/apiSlice.js';

export default function ListData(props) {
    const apiData = useSelector((state) => state.apiData);
    // const dispatch = useDispatch();
    return (
        <>
            ${JSON.stringify(apiData)}
        </>
    );
}