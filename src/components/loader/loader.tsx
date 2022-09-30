import React from 'react';
import { observer } from 'mobx-react';
import LoaderState from "@state/loader-state"

export const LoaderComponent = new LoaderState();

 const Loader: React.FC = () => {
  
  return (
    <div className={`loader ${LoaderComponent.loadingState}`}>
        <img src="/assets/gif/loader.gif" alt="Loading" className="loader__gif" />
    </div>
  )
}


export default observer(Loader);