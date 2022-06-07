import { Formik, Form, Field, ErrorMessage } from "formik";
import { CANCEL, FILL_THE_FORM } from "../../Constants/text";
import Error from "./Error";
import { useState, useEffect, useContext } from "react";
import {
  INPUT_COUNT_ON_SINGLE_PAGE,
  MOBILE_VIEW,
  TABLET_VIEW,
} from "../../Constants/numbers";
import Paginator from "../Paginator";
import { UserContext } from "../../App";
import style from "../../Assets/Styles/form.module.scss";
import Select from "../Select";

export default function CustomForm({
  fields,
  formHeader,
  onSubmit,
  onCancel,
  onChangeForm,
  formList,
  currentFormIndex,
  validationSchema,
  submitText,
}) {
  const { width } = useContext(UserContext);
  const [input_count, setCount] = useState(INPUT_COUNT_ON_SINGLE_PAGE);
  const [page, setPage] = useState(input_count);
  const [formFields, setFormFields] = useState([]);

  const getInitValuesObject = (fields) => {
    if (
      typeof fields === `object` &&
      !Array.isArray(fields) &&
      fields !== null
    ) {
      return fields;
    }

    const initialValues = {};
    fields?.forEach(
      (field) => (initialValues[field.name] = field.initialValue)
    );
    return initialValues;
  };

  const onFormChange = (formName, width, onChangeForm) => {
    const reservedForSelector = onChangeForm ? 1 : 0;

    onChangeForm(formName);
    console.log(
      width <= TABLET_VIEW
        ? INPUT_COUNT_ON_SINGLE_PAGE - reservedForSelector
        : 2 * INPUT_COUNT_ON_SINGLE_PAGE
    );
    setPage(
      width <= TABLET_VIEW
        ? INPUT_COUNT_ON_SINGLE_PAGE - reservedForSelector
        : 2 * INPUT_COUNT_ON_SINGLE_PAGE
    );
  };

  const isFieldsCountAcceptable = () => {
    if (!formFields) return false;

    if (Array.isArray(formFields)) {
      return formFields?.length >= INPUT_COUNT_ON_SINGLE_PAGE;
    }
    return Object.keys(formFields).length >= INPUT_COUNT_ON_SINGLE_PAGE;
  };

  const isFieldsCountAcceptableForTablet = () => {
    if (!formFields) return false;
    if (Array.isArray(formFields)) {
      return formFields?.length < INPUT_COUNT_ON_SINGLE_PAGE;
    }
    return Object.keys(formFields).length < INPUT_COUNT_ON_SINGLE_PAGE;
  };

  const renderFields = () => {
    let fields = formFields;
    if (
      typeof formFields === `object` &&
      !Array.isArray(formFields) &&
      formFields !== null
    ) {
      fields = Object.keys(formFields).map((key) => {
        return {
          name: key,
          initialValue: formFields[key],
          type: "text",
        };
      });
    }

    return fields?.map((field, index) => (
      <div
        key={field.name}
        style={
          page - input_count <= index && index < page
            ? { display: `flex` }
            : { display: `none` }
        }
        className={style?.field}
      >
        <Field
          type={field.type}
          name={field.name}
          placeholder={field?.placeholder ? field.placeholder : field.name}
        />
        <ErrorMessage
          name={field.name}
          render={(message) => (
            <Error message={message} className={style?.error} />
          )}
        />
      </div>
    ));
  };

  const onDecrease = (event) => {
    event.preventDefault();
    setPage((prev) => prev - input_count);
  };
  const onIncrease = (event) => {
    event.preventDefault();
    setPage((prev) => prev + input_count);
  };

  const onCancelButtonClick = (event) => {
    event.preventDefault();
    onCancel();
  };

  const isPaginatorVisible = () => {
    if (!formFields) return false;

    if (Array.isArray(formFields)) return formFields?.length > input_count;
    return Object.keys(formFields).length > input_count;
  };

  const formClass = () => {
    if (width <= MOBILE_VIEW) return style.form_mobile;
    else if (width <= TABLET_VIEW) return style.form_tablet;
    else if (width > TABLET_VIEW && isFieldsCountAcceptable())
      return style.form;
    else return style.form_tablet;
  };

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

  useEffect(() => {
    setFormFields(fields);
  }, [fields]);

  return (
    <Formik
      key={formFields?.[0]?.name}
      initialValues={getInitValuesObject(formFields)}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {() => (
        <Form
          className={formClass()}
          style={
            isFieldsCountAcceptable()
              ? { height: `${INPUT_COUNT_ON_SINGLE_PAGE * 54 + 124}px` }
              : null
          }
        >
          <div
            className={style.nameContainer}
            style={
              width <= TABLET_VIEW && isPaginatorVisible()
                ? { display: `none` }
                : null
            }
          >
            <h1
              className={style?.name}
              style={!isFieldsCountAcceptable() ? { width: `100%` } : null}
            >
              {formHeader}
            </h1>
            {onChangeForm &&
            width > TABLET_VIEW &&
            isFieldsCountAcceptable() ? (
              <div className={style.selectHolder}>
                <Select
                  itemList={formList}
                  onItemChange={(name) =>
                    onFormChange(name, width, onChangeForm)
                  }
                  currentItemIndex={currentFormIndex}
                />
              </div>
            ) : null}
          </div>
          {width <= TABLET_VIEW && isPaginatorVisible() ? (
            <Paginator
              page={page}
              elementsNumberOnPage={input_count}
              onPageDecrease={onDecrease}
              onPageIncrease={onIncrease}
              totalRecordNumber={
                formFields?.length
                  ? formFields?.length
                  : Object.keys(formFields)?.length
              }
              children={
                <h3 className={style?.paginatorHeader}>{FILL_THE_FORM}</h3>
              }
              style={style}
            />
          ) : null}
          <div
            className={style?.fieldContainer}
            style={
              isFieldsCountAcceptable()
                ? { height: `${INPUT_COUNT_ON_SINGLE_PAGE * 54}px` }
                : null
            }
          >
            {(onChangeForm && width <= TABLET_VIEW) ||
            (onChangeForm && isFieldsCountAcceptableForTablet()) ? (
              <div className={style.selectHolder}>
                <Select
                  itemList={formList}
                  onItemChange={(name) =>
                    onFormChange(name, width, onChangeForm)
                  }
                  currentItemIndex={currentFormIndex}
                />
              </div>
            ) : null}
            {renderFields()}
          </div>
          {width > TABLET_VIEW && isPaginatorVisible() ? (
            <Paginator
              page={page}
              elementsNumberOnPage={input_count}
              onPageDecrease={onDecrease}
              onPageIncrease={onIncrease}
              totalRecordNumber={
                formFields?.length
                  ? formFields?.length
                  : Object.keys(formFields)?.length
              }
              children={
                <div
                  className={style.buttonContainer}
                  style={width > TABLET_VIEW ? { width: `50%` } : null}
                >
                  <button type="submit" className={style?.submit}>
                    {submitText}
                  </button>
                  {onCancel ? (
                    <button
                      className={style.cancel}
                      onClick={onCancelButtonClick}
                    >
                      {CANCEL}
                    </button>
                  ) : null}
                </div>
              }
              style={style}
            />
          ) : null}
          <div className={style.buttonContainer}>
            {!isPaginatorVisible() || width <= TABLET_VIEW ? (
              <button type="submit" className={style?.submit}>
                {submitText}
              </button>
            ) : null}
            {(!isPaginatorVisible() && onCancel) ||
            (width <= TABLET_VIEW && onCancel) ? (
              <button className={style.cancel} onClick={onCancelButtonClick}>
                {CANCEL}
              </button>
            ) : null}
          </div>
        </Form>
      )}
    </Formik>
  );
}
