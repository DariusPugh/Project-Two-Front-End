import * as React from 'react';
// import { environment } from '../../environment';

export class ReviewListComponent extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            reviewList: new Array(),
        }
    }

    public componentDidMount() {
        // call server to get the component list
    }

    public render() {
        return (
            <div>
                {this.state.reviewList.map((review:any, i:any) => {
                    // style this as a link
                    return (
                        <div key={i} className="link" onClick={this.updateCategory} id={review.reviewID}>{i}</div>
                    );
                })}
            </div>
        );
    }

    private updateCategory (e:any) {
        this.props.updateCategory(e.target.id);
    }
}