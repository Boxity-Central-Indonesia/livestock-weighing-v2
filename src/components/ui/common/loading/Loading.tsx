import { ThreeDots } from 'react-loader-spinner';

export const Loading = () => {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#F95B12"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass="" 
            />
        </div>
    );
}
