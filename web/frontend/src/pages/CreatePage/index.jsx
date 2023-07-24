import React, {useEffect} from 'react';
import {IonIcon,IonModal,IonDatetime,IonDatetimeButton,IonSelect,IonSelectOption,IonInput,IonPage,IonHeader,IonButton, IonButtons, IonContent, IonTitle, IonToolbar} from '@ionic/react'
import {arrowBack, add} from 'ionicons/icons'
import FieldSet from '../../components/FieldSet';
import './createPage.css'

const CreatePage = () => {
    useEffect(() => {
    if(document){
      document.title = "Create Store"
    }
  }, []);
    return <IonPage>
                <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton routerLink="/home">
                        <IonIcon size="large" icon={arrowBack}></IonIcon>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Create Store</IonTitle>
                </IonToolbar>
                </IonHeader>
                    <IonContent>
                        <div className='fieldset-container'>
                        <FieldSet title="Basic Details">
                            <IonInput label="Store Id" labelPlacement="floating" fill="outline" ></IonInput>
                            <IonInput label="Store Name" labelPlacement="floating" fill="outline" ></IonInput>
                            <IonInput label="Store Address" labelPlacement="floating" fill="outline" ></IonInput>
                            <IonSelect label="Active" labelPlacement="floating" fill="outline" >
                                <IonSelectOption value={true}>True</IonSelectOption>
                                <IonSelectOption value={false}>False</IonSelectOption>
                            </IonSelect>
                        </FieldSet>
                        <FieldSet title="Location Details">
                            <IonInput label="Latitude" labelPlacement="floating" fill="outline" ></IonInput>
                            <IonInput label="Longitude" labelPlacement="floating" fill="outline" ></IonInput>
                            <IonInput label="Address Line 1" labelPlacement="floating" fill="outline" ></IonInput>
                            <IonInput label="Address Line 2" labelPlacement="floating" fill="outline" ></IonInput>
                            <IonInput label="City" labelPlacement="floating" fill="outline" ></IonInput>
                            <IonInput label="State" labelPlacement="floating" fill="outline" ></IonInput>
                            <IonInput label="Zipcode" labelPlacement="floating" fill="outline" ></IonInput>
                            <IonInput label="Country" labelPlacement="floating" fill="outline" ></IonInput>
                            <IonInput label="Phone Number" labelPlacement="floating" fill="outline" ></IonInput>
                            <IonInput label="Mall Name" labelPlacement="floating" fill="outline" ></IonInput>
                            <IonSelect label="Timezone" labelPlacement="floating" fill="outline">
                                <IonSelectOption value="PST">PST</IonSelectOption>
                                <IonSelectOption value="CST">CST</IonSelectOption>
                                <IonSelectOption value="EST">EST</IonSelectOption>
                            </IonSelect>
                        </FieldSet>
                        <FieldSet title="Regular Hours">
                            <div className='hour-container'>
                                <span>Day</span>
                                <div style={{flexBasis: '50%', display: 'flex', justifyContent: 'space-between'}}>
                                    <span>Open</span>
                                    <span>Close</span>
                                </div>
                            </div>
                            <div className='day-container'>
                                <p>Monday</p>
                                <div className='time-container'>
                                        <IonDatetimeButton id='openregulartime' datetime="timeonlyregularopen"></IonDatetimeButton>
                                        <IonDatetimeButton id='closeregulartime' datetime="timeonlyregularclose"></IonDatetimeButton>
                                        <IonModal trigger='openregulartime' keepContentsMounted={true}>
                                            <IonDatetime presentation="time" id="timeonlyregularopen" showDefaultButtons={true}>
                                                <span slot="title">Select a Reservation Time</span>
                                            </IonDatetime>
                                        </IonModal>
                                        <IonModal trigger='closeregulartime' keepContentsMounted={true}>
                                            <IonDatetime presentation="time" id="timeonlyregularclose" showDefaultButtons={true}>
                                                <span slot="title">Select a Reservation Time</span>
                                            </IonDatetime>
                                        </IonModal>
                                </div>
                            </div>
                        </FieldSet>
                        <FieldSet title="Special Hours">
                            <div className='special-day-container'>
                                <IonDatetimeButton datetime="dateonly"></IonDatetimeButton>
                                <IonDatetimeButton id="opendatespecial" datetime="timeonlyopen"></IonDatetimeButton>
                                <IonDatetimeButton id="closedatespecial" datetime="timeonlyclose"></IonDatetimeButton>
                                <IonModal keepContentsMounted={true}>
                                    <IonDatetime presentation="date" id="dateonly" showDefaultButtons={true}>
                                        <span slot="title">Select a Reservation Date</span>
                                    </IonDatetime>
                                </IonModal>
                                <IonModal trigger='opendatespecial' keepContentsMounted={true}>
                                    <IonDatetime presentation="time" id="timeonlyopen" showDefaultButtons={true}>
                                        <span slot="title">Select a Reservation Time</span>
                                    </IonDatetime>
                                </IonModal>
                                <IonModal trigger='closedatespecial' keepContentsMounted={true}>
                                    <IonDatetime presentation="time" id="timeonlyclose" showDefaultButtons={true}>
                                        <span slot="title">Select a Reservation Time</span>
                                    </IonDatetime>
                                </IonModal>
                                <div style={{flexBasis: "34.5%"}}>
                                <IonInput label="Description" labelPlacement="floating" fill="outline" ></IonInput>
                                </div>
                            </div>
                            <div style={{maxWidth: '120px'}}>
                                <IonButton fill="outline">
                                    <IonIcon icon={add}></IonIcon>
                                    Add More
                                </IonButton>
                            </div>
                        </FieldSet>
                        <div className='button-container'>
                        <IonButton fill="outline">
                            Cancel
                        </IonButton>
                        <IonButton fill="outline">
                            Save
                        </IonButton>
                        </div>
                        </div>
                    </IonContent>
           </IonPage>;
}

export default CreatePage;