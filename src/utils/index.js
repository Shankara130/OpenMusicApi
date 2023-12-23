const mapDbToModel = ({
    id,
    name,
    year,
    created_at,
    updated_at,
}) => ({
    id,
    name,
    year,
    createdAT: created_at,
    updatedAT: updated_at,
});

module.exports = { mapDbToModel };
