import PT from 'prop-types';

import css from './Filter.module.css';

export default function Filter({ value, onChange }) {
  return (
    <label className={css.label}>
      Find contacts by name
      <input
        className={css.field}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

Filter.propTypes = {
  value: PT.string.isRequired,
  onChange: PT.func.isRequired,
};
