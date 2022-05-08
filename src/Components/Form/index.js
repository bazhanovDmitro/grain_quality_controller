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
  formName,
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
    const reservedForSelector = onChangeForm ? 1 : 0;

    const new_ic =
      width <= TABLET_VIEW
        ? INPUT_COUNT_ON_SINGLE_PAGE - reservedForSelector
        : 2 * INPUT_COUNT_ON_SINGLE_PAGE;

    setCount((prev) => {
      if (prev !== new_ic) {
        setPage(new_ic);
        return new_ic;
      }
      return prev;
    });
  }, [width, onChangeForm]);

  return (
    <Formik
      initialValues={getInitValuesObject(fields)}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {() => (
        <Form
          className={
            width > TABLET_VIEW && fields.length > INPUT_COUNT_ON_SINGLE_PAGE
              ? style.form
              : style.form_mobile
          }
          style={
            fields.length > INPUT_COUNT_ON_SINGLE_PAGE
              ? { height: `${INPUT_COUNT_ON_SINGLE_PAGE * 54 + 124}px` }
              : null
          }
        >
          <div
            className={style.nameContainer}
            style={
              width <= TABLET_VIEW && isPaginatorVisible
                ? { display: `none` }
                : null
            }
          >
            <h1 className={style?.name}>{formName}</h1>
            {onChangeForm &&
            width > TABLET_VIEW &&
            fields.length >= INPUT_COUNT_ON_SINGLE_PAGE ? (
              <div>
                <input
                  style={{
                    height: "36px",
                    marginTop: "4px",
                    padding: "5px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            ) : null}
          </div>
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
                <h3 className={style?.paginatorHeader}>{FILL_THE_FORM}</h3>
              }
              style={style}
            />
          ) : null}
          <div
            className={style?.fieldContainer}
            style={
              fields.length > INPUT_COUNT_ON_SINGLE_PAGE
                ? { height: `${INPUT_COUNT_ON_SINGLE_PAGE * 54}px` }
                : null
            }
          >
            {(onChangeForm && width <= TABLET_VIEW) ||
            (onChangeForm && fields.length < INPUT_COUNT_ON_SINGLE_PAGE) ? (
              <div>
                <input
                  style={{
                    height: "36px",
                    width: "100%",
                    marginTop: "18px",
                    padding: "5px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            ) : null}
            {fields.map((field, index) => (
              <div
                key={field.name}
                style={
                  page - input_count <= index && index < page
                    ? { display: `flex` }
                    : { display: `none` }
                }
                className={style?.field}
              >
                <Field type={field.type} name={field.name} />
                <ErrorMessage
                  name={field.name}
                  render={(message) => (
                    <Error message={message} className={style?.error} />
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
                <button type="submit" className={style?.submit}>
                  {submitText}
                </button>
              }
              style={style}
            />
          ) : null}
          <>
            {!isPaginatorVisible || width <= TABLET_VIEW ? (
              <div className={style.submitContainer}>
                <button type="submit" className={style?.submit}>
                  {submitText}
                </button>
              </div>
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
