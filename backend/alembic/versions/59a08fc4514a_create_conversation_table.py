"""create conversation table

Revision ID: 59a08fc4514a
Revises: 6408efd24b89
Create Date: 2024-03-24 08:42:03.085377

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision: str = "59a08fc4514a"
down_revision: Union[str, None] = "6408efd24b89"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "conversation",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=True),
        sa.Column("slug", sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column("excerpt", sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    sa.ForeignKeyConstraint(
        ["user_id"],
        ["user.id"],
    ),
    op.create_index(op.f("ix_slug"), "conversation", ["slug"], unique=True)


def downgrade() -> None:
    op.drop_index(op.f("ix_slug"), table_name="conversation")
    op.drop_table("conversation")
