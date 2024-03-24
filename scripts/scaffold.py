"""
Utility Script

"""

import os
import re
import logging

import click


@click.group(context_settings=dict(help_option_names=["-h", "--help"]))
def cli() -> None:
    """DB Utility Script!!!.
    """
    pass

@cli.command()
@click.option(
    "-n",
    "--name",
    required=True,
    type=str,
    help="the name of the model"
)
@click.pass_context
def run(ctx, name: str) -> None:
    print(f"Creating your templates for {name}......")
    """
    The scripts creates a new model file in the backend/models directory.
    """
    files = ['models', 'controller', 'crud', 'schema']
    for type in files:
        if type == 'models':
            directory = '../backend/models'
            template_path = '../backend/templates/model.txt'
        elif type == 'controller':
            directory = '../backend/api'
            template_path = '../backend/templates/controller.txt'
        elif type == 'crud':
            directory = '../backend/crud'
            template_path = '../backend/templates/crud.txt'
        elif type == 'schema':
            directory = '../backend/schemas'
            template_path = '../backend/templates/schema.txt'
        else:
            logging.error("Invalid type")
            continue
        try:
            # Create the directory if it doesn't exist
            os.makedirs(directory, exist_ok=True)

            # Specify the file name (you can customize this if needed)
            file_name = f"{name.lower()}.py"

            # Join the directory path and file name
            file_path = os.path.join(directory, file_name)

            # Check if the file already exists
            if os.path.exists(file_path):
                logging.error(f"File '{file_name}' already exists in '{directory}'. Please choose a different name.")
                continue

            # Read the template content from the specified file
            with open(template_path, 'r') as template_file:
                template_content = template_file.read()

            # Substitute the placeholder with the provided name
            template_content = re.sub(r'{{name}}', name.lower(), template_content)
            template_content = re.sub(r'{{cname}}', name.capitalize(), template_content)

            # Write the template content to the new file
            with open(file_path, 'w') as new_file:
                new_file.write(template_content)

            logging.info(f"File '{file_name}' created successfully in '{directory}' using the template '{template_path}'.")

        except Exception as e:
            logging.error(f"An error occurred: {e}")


if __name__ == '__main__':
    cli()
