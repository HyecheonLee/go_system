import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import {Navbar} from "./NavBar";
import {useNavDropMenu} from "./Hooks/useNavDropMenu";
import {NavDropMenu} from "./NavDropMenu";
import {useModal} from "./Hooks/useModal";
import {Modal} from "./Modal";
import {useWs} from "./Hooks/useWs";
import styled from 'styled-components';
import {Loader} from "./Loader";
import {Alerts} from "./Alerts";
import {Pty} from "./Pty";
import {Prism} from "./Prism";
import {usePrism} from "./Hooks/usePrism";
import {VerticalMenu} from "./VerticalMenu";
import {useOperations} from "./Hooks/useOperations";
import {Operations} from "./Operations";


const StyledContentArea = styled.div`
position: relative;
z-index: 1;

width: 120rem;
height: 100vh;
margin: 0 auto;

display: grid;
grid-template-columns: 32rem 86.5rem;
grid-auto-rows: min-content;
grid-gap: 1.5rem;

padding-top: 8rem;

& #content-area-main-display-content {
position: relative;
}
`

function App() {
  const ws = useWs();
  const prism = usePrism();
  const ndm = useNavDropMenu();
  const modal = useModal();
  const ops = useOperations();

  const [vms, setVms] = useState([
    <VerticalMenu key="vm1" type="documentation" {...prism}/>,
    <VerticalMenu key="vm2" type="back-end" {...prism}/>,
    <VerticalMenu key="vm3" type="front-end" {...prism}/>,
  ]);
  const doLogOut = () => {
    ws.setJwt('^vAr^');
    ws.setUser(null);
    ws.setVerifiedJwt(null);
    ws.setValidCredentials(null);
    window.localStorage.removeItem("Pr0conJwt");
  };

  useEffect(() => {
    if (ws.rs === 1) {
      let storedJwt = window.localStorage.getItem('Pr0conJwt');
      if (storedJwt !== null) {
        let psjwt = JSON.parse(atob(storedJwt.split('.')[1]));
        let exp = new Date(psjwt['exp'] * 1000).toUTCString();
        let now = new Date(Date.now()).toUTCString();
        console.log(now);
        console.log(exp);
        if (exp > now) {
          console.log('Stored Jwt Good');
          ws.request(storedJwt, 'validate-stored-jwt-token', 'noop');
        }
        if (exp < now) {
          ws.setLoading(false);
          window.localStorage.removeItem('Pr0conJwt');
        }
      } else {
        ws.setLoading(false);
      }
    }
  }, [ws.rs]);

  useEffect(() => {
    ws.setValidCredentials(null);
  }, [modal.modalShowing]);

  useEffect(() => {
    modal.setModalShowing(false);
  }, [ws.toggleModal]);

  useEffect(() => {
    setTimeout(function () {
      ws.setToastMsg("")
    }, 5000)
  }, [ws.toastMsg])


  return (
    <>
      <Navbar {...ndm} {...modal} loading={ws.loading} validjwt={ws.verifiedJwt}/>
      <NavDropMenu {...ndm} doLogOut={doLogOut}/>
      {
        ws.loading === false &&
        <StyledContentArea onMouseEnter={(e) => ndm.setNavDropMenuPosX(-320)}>
          <div id="content-area-main-display-void">
          </div>
          <div id="content-area-main-display-header">
            {ws.toastMsg !== "" &&
            <Alerts type={ws.toastType} msg={ws.toastMsg} showIcon={true}/>}
          </div>
          <div id="content-area-main-display-sidebar">
            {(ws.user && ws.user.role === "system-admin") && <VerticalMenu type="administration" opsShowing={ops.opsShowing} setOpsShowing={ops.setOpsShowing}/>}
            {vms.map((vm) => (vm))}
          </div>
          <div id="content-area-main-display-content">
            <Pty/>
            <div id="prism-title">{prism.prismPath}</div>
            <Prism  {...prism} />
            <Operations {...ops} clientList={ws.clientList} request={ws.request} mysqlDbs={ws.mysqlDbs}/>
          </div>
        </StyledContentArea>
      }
      {ws.loading === true && <Loader isPageLoad={true}/>}
      {
        modal.modalShowing &&
        <>
          <Modal {...modal}
                 validjwt={ws.verifiedJwt}
                 validcreds={ws.validCredentials}
                 request={ws.request}
                 userAvail={ws.userAvail}
                 setUserAvail={ws.setUserAvail}
          />
        </>
      }
    </>)
}

if (document.getElementById('react_root')) {
  ReactDOM.render(<App/>, document.getElementById('react_root'));
}