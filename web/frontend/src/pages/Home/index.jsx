import React, {useEffect, useState} from 'react';
import { IonContent,IonRippleEffect,IonIcon,IonBadge,IonSearchbar,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonHeader, IonButtons,IonButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {logOutOutline, trashBin, add, arrowBack, arrowForward} from 'ionicons/icons'
import dummyStore from "../../dummy.json";
import {axiosInstance} from '../../helper/axios'
import "./Home.css";

const Home= () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    if(document){
      document.title = "Store DashBoard"
    }
  }, []);
  useEffect(() => {
    async function getStoreData() {
        const {data} = await axiosInstance.get(`/stores?page=${currentPage}&limit=5`);
        setStoreData(data?.stores)
    }
    getStoreData();
  }, [])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              Sign out &nbsp;
              <IonIcon icon={logOutOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
            <div className="search-container">
              <IonSearchbar placeholder='Search Store' showClearButton="always" clearIcon={trashBin}></IonSearchbar>
              <IonButtons slot="end">
                <IonButton routerLink="/create">
                  <IonIcon size="large" icon={add}></IonIcon>
                </IonButton>
              </IonButtons>
            </div>
            <div className="card-container">
            {dummyStore.map((ele, index) => (
              <div key={index} className="ion-activatable ripple-parent custom-parent" >
              <IonCard key={index}>
                <IonRippleEffect></IonRippleEffect>
                <div key={index} className="card-layout-container">
                  <div className='inner-container'>
                    <IonCardHeader>
                      <IonCardTitle>{ele.name}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <p>{ele.address}</p>
                      <p>{ele.country}</p>
                    </IonCardContent>
                  </div>
                  <div className='inner-container'>
                    <IonCardHeader>
                      <IonCardTitle>Regular Hours</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      {Object.entries(ele.working_hours.regular).map((item, ind) => (
                        <div className='regular-container'>
                          <p>{`${item[0]} : ${item[1][0]}:00 AM - ${item[1][1]}:00 AM`}</p>
                        </div>
                      ))}
                    </IonCardContent>
                  </div>
                  <div className='inner-container'>
                    <IonCardHeader>
                      <IonCardTitle>Special Hours</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        {ele.working_hours.special.map((item, index) => (
                            <div className='regular-container'>
                              {item.time ? <p>{`${item.date} : ${item.time[0]}:00 AM - ${item.time[1]}:00 AM`}</p> : 
                              <p>{`${item.date}`}</p>}
                              <div style={{flexGrow: "0"}}>
                              {item.tag === "Emergency" ? <IonBadge color="danger">{item.tag}</IonBadge> : <IonBadge>{item.tag}</IonBadge>}
                              </div>
                        </div>
                        ))
                        }
                    </IonCardContent>
                  </div>
                </div>
                </IonCard>
                </div>
            ))}
            </div>
            <div className="pagination-container">
                    <IonButton fill='clear'>
                      <IonIcon icon={arrowBack}></IonIcon>
                      &nbsp;Previous
                    </IonButton>
                    <IonButton fill='clear'>
                      <IonIcon icon={arrowForward}></IonIcon>
                      &nbsp;Next
                    </IonButton>
            </div>
        </IonContent>
    </IonPage>
  );
};

export default Home;
