import * as React from 'react';
// import { environment } from '../../environment';

export class ItemListComponent extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            itemList: new Array(),
        }
    }

    public componentDidMount() {
        // call server to get the component list
    }

    public render() {
        return (
            <div>
                {this.state.itemList.map((item:any, i:any) => {
                    // style this as a link
                    return (
                        <div key={i} className="link" onClick={this.updateCategory} id={item.title}>{item.title}</div>
                    );
                })}
            </div>
        );
    }

    private updateCategory (e:any) {
        this.props.updateCategory(e.target.id);
    }
}