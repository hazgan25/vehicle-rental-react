import React, { useEffect } from "react";
import styles from "./index.module.scss";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { listVehiclePopularAction } from "../../redux/actions/listVehicles";
import { paramsPopulerVehicle } from "../../modules/helper/listVehicle";

const ErrorServer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listVehiclePopularAction(paramsPopulerVehicle)).then((res) => {
      if (res) {
        navigate("/");
      }
    });
  }, [dispatch, navigate]);
  return (
    <main className={styles["error-server"]}>
      <div className={`container-fluid ${styles["transparan-bg"]}`}>
        <div className="container">
          <div className={styles["err-page"]}>
            <h1 className={styles["font-err-page"]}>500</h1>
            <h3 className={styles["error-server-text"]}>
              looks like the server has an error/Maintenance
            </h3>
            <h4 className={styles["err-about-text"]}>About Error :</h4>
            <ul>
              <li className={styles["err-about-text"]}>
                Server/Backend Error/Maintenance
              </li>
              <li className={styles["err-about-text"]}>
                My Free Host Heroku is Sleep/Dyno Free Sleeping || Docs
                <a
                  href="https://devcenter.heroku.com/articles/free-dyno-hours"
                  className={styles["orange-text"]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Offical Dyno Hour Heroku{" "}
                </a>
                but it can be reactivated automatically during a 2 month sleep
                period
              </li>
            </ul>
            <h4 className={styles["err-about-text"]}>
              if you still want to try exploring the vehicle rental website you
              can remind me to change my backup REST API :{" "}
              <a
                href="mailto:hazgnxv@gmail.com?subject=Server/Website Vehicle Rental is Error 500"
                className={styles["orange-text"]}
              >
                Send Message to remind/notify (by email)
              </a>
            </h4>
            <a
              href="https://en.wikipedia.org/?title=500_error&redirect=no"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className={styles["btn-see"]}>See About Error</button>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ErrorServer;
