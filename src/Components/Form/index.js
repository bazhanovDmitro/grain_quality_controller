import { Formik, Form, Field, ErrorMessage } from "formik";
import { CANCEL, FILL_THE_FORM } from "../../Constants/text";
import Error from "./Error";
import { useState, useEffect, useContext } from "react";
import {
  INPUT_COUNT_ON_SINGLE_PAGE,
  TABLET_VIEW,
} from "../../Constants/numbers";
import Paginator from "../Paginator";
import Close from "../Buttons/Close";
import { UserContext } from "../../App";
import style from "../../Assets/Styles/form.module.scss";

export default function CustomForm({
  fields,
  onSubmit,
  onCancel,
  onChangeForm,
  validationSchema,
  submitText,
}) {
  const { width } = useContext(UserContext);
  const [input_count, setCount] = useState(INPUT_COUNT_ON_SINGLE_PAGE);
  const [page, setPage] = useState(input_count);

  const getInitValuesObject = (fields) => {
    const initialValues = {};
    fields.forEach((field) => (initialValues[field.name] = field.initialValue));
    return initialValues;
  };

  const onDecrease = () => setPage((prev) => prev - input_count);
  const onIncrease = () => setPage((prev) => prev + input_count);

  const onCancelButtonClick = (event) => {
    event.preventDefault();
    onCancel();
  };

  const isPaginatorVisible = fields.length > input_count;

  useEffect(() => {
    const new_ic =
      width <= TABLET_VIEW
        ? INPUT_COUNT_ON_SINGLE_PAGE
        : 2 * INPUT_COUNT_ON_SINGLE_PAGE;

    setCount((prev) => {
      if (prev !== new_ic) {
        setPage(new_ic);
        return new_ic;
      }
      return prev;
    });
  }, [width]);

  return (
    <Formik
      initialValues={getInitValuesObject(fields)}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {() => (
        <Form
          className={style.form}
          style={isPaginatorVisible ? { height: `585px` } : null}
        >
          {width > TABLET_VIEW && onCancel ? (
            <Close onClick={onCancelButtonClick} />
          ) : null}
          {width <= TABLET_VIEW && isPaginatorVisible ? (
            <Paginator
              page={page}
              elementsNumberOnPage={input_count}
              onPageDecrease={onDecrease}
              onPageIncrease={onIncrease}
              totalRecordNumber={fields.length}
              children={
                <h3 className={style.paginatorHeader}>{FILL_THE_FORM}</h3>
              }
              style={style}
            />
          ) : null}
          {onChangeForm ? (
            <div style={{ height: "36px", marginTop: "25px" }}>
              Here should be a select elem and a name for this form
            </div>
          ) : null}
          <div className={style.fieldContainer}>
            {fields.map((field, index) => (
              <div
                key={field.name}
                style={
                  page - input_count <= index && index < page
                    ? { display: `flex` }
                    : { display: `none` }
                }
                className={style.field}
              >
                <Field type={field.type} name={field.name} />
                <ErrorMessage
                  name={field.name}
                  render={(message) => (
                    <Error message={message} className={style.error} />
                  )}
                />
              </div>
            ))}
          </div>
          {width > TABLET_VIEW && isPaginatorVisible ? (
            <Paginator
              page={page}
              elementsNumberOnPage={input_count}
              onPageDecrease={onDecrease}
              onPageIncrease={onIncrease}
              totalRecordNumber={fields.length}
              children={
                <button type="submit" className={style.submit}>
                  {submitText}
                </button>
              }
              style={style}
            />
          ) : null}
          <>
            {!isPaginatorVisible || width <= TABLET_VIEW ? (
              <button type="submit" className={style.submit}>
                {submitText}
              </button>
            ) : null}
            {width <= TABLET_VIEW && onCancel ? (
              <button onClick={onCancelButtonClick}>{CANCEL}</button>
            ) : null}
          </>
        </Form>
      )}
    </Formik>
  );
}
